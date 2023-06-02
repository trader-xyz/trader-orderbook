import { Router, Response } from 'express'
import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { NftSwapV4, OrderStatusV4 } from '@traderxyz/nft-swap-sdk'
import { PubSub } from '@google-cloud/pubsub'
import { isHexString } from '@ethersproject/bytes'
import type { orders_v4_nfts, orders_with_latest_status, Prisma } from '@prisma/client'
import type { RateLimitRequestHandler } from 'express-rate-limit'
import type { NftOrderV4Serialized, SignedNftOrderV4Serialized } from '../types'
import { logger } from '../logger'
import { getPrismaClient } from '../prisma-client'
import { signedNftOrderV4SerializedSchema } from '../validations'
import { createApiError } from '../errors/api-error'
import { modelDbOrderToSdkOrder, nftOrderToDbModel } from '../services/api-web/utils/order-parsing'
import { GCP_PROJECT_ID, getJsonRpcUrlByChainId, getZeroExContract } from '../default-config'
import { PUBSUB_TOPICS } from '../services/utils/pubsub'
import { OrderStatusUpdateRequestEvent } from '../services/utils/messaging-types'

export enum TradeDirection {
  SellNFT = 0,
  BuyNFT = 1,
}

export interface OrderPayload {
  erc20Token: string
  erc20TokenAmount: string
  nftToken: string
  nftTokenId: string
  nftTokenAmount: string
  nftType: string
  sellOrBuyNft: 'buy' | 'sell'
  chainId: string
  order: NftOrderV4Serialized
  metadata: Record<string, string> | null
  orderStatus: {
    status: string | null
    transactionHash: string | null
    blockNumber: number | null
  }
}

const orderToOrderPayload = (dbOrder: orders_with_latest_status): OrderPayload => {
  return {
    // Add some order data to Ttop level data for searchability/api standadization
    erc20Token: dbOrder.erc20_token,
    erc20TokenAmount: dbOrder.erc20_token_amount,
    nftToken: dbOrder.nft_token,
    nftTokenId: dbOrder.nft_token_id,
    nftTokenAmount: dbOrder.nft_token_amount ?? undefined,
    nftType: dbOrder.nft_type,
    sellOrBuyNft: parseInt(dbOrder.direction.toString()) === TradeDirection.BuyNFT ? 'buy' : 'sell',
    chainId: dbOrder.chain_id,
    order: modelDbOrderToSdkOrder(dbOrder),
    orderStatus: {
      status: dbOrder.order_status,
      transactionHash: dbOrder.transaction_hash,
      blockNumber: dbOrder.block_number ? Number.parseInt(dbOrder.block_number?.toString()) : null,
    },
    metadata: (dbOrder.app_metadata as Record<string, string>) ?? null,
  }
}

const prisma = getPrismaClient()

const MAX_ITEM_QUERY_LIMIT = 1000
const DEFAULT_ITEM_QUERY_LIMIT = 200

const createOrderbookRouter = () => {
  const orderRouter = Router()

  orderRouter.get('/', (_, res) => res.sendStatus(200))
  orderRouter.get('/healthcheck', (_, res) => res.sendStatus(200))

  interface SearchOrdersSqlFilterParams {
    erc20_token: string
    nft_token_id: string
    nft_token: string
    nft_type: string
    chain_id: string
    maker: string
    taker: string
    nonce: string
    order_status: null | 'filled' | 'expired' | 'cancelled'
    direction: string
    order_valid: boolean
  }

  interface SearchOrdersQueryParams {
    nftTokenId: string | string[]
    erc721TokenId: string
    erc20Token: string | string[]
    erc1155TokenId: string
    nftToken: string | string[]
    erc721Token: string
    erc1155Token: string
    nftType: string
    chainId: string | number | string[] | number[]
    maker: string
    taker: string
    nonce: string | string[]
    offset: string | number
    limit: string | number
    sellOrBuyNft: 'sell' | 'buy'
    direction: '0' | '1'
    // Allow a few different ways to use the order status query param (backwards compat)
    order_status: 'open' | 'filled' | 'expired' | 'cancelled' | 'all'
    orderStatus: 'open' | 'filled' | 'expired' | 'cancelled' | 'all'
    // Defaults to only 'open' orders
    status: 'open' | 'filled' | 'expired' | 'cancelled' | 'all'
    visibility: 'public' | 'private'
    valid: 'valid' | 'all'
  }

  orderRouter.get('/orders', async (req, res: Response, next) => {
    const queryParams: Partial<SearchOrdersQueryParams> = req.query

    logger.info(`Received orderbook request`, { ...queryParams })

    let filterParamsAND: Prisma.Enumerable<Prisma.orders_with_latest_statusWhereInput> = []
    // Collect all filter params manually... (we can automate this later)
    const erc20Token = queryParams.erc20Token
    if (erc20Token) {
      if (Array.isArray(erc20Token)) {
        filterParamsAND.push({
          erc20_token: {
            in: [...erc20Token],
            mode: 'insensitive',
          },
        })
      } else {
        filterParamsAND.push({
          erc20_token: {
            equals: erc20Token,
            mode: 'insensitive',
          },
        })
      }
    }
    const nftTokenId = queryParams.nftTokenId ?? queryParams.erc721TokenId ?? queryParams.erc1155TokenId
    if (nftTokenId) {
      if (Array.isArray(nftTokenId)) {
        filterParamsAND.push({
          nft_token_id: {
            in: [...nftTokenId],
            mode: 'insensitive',
          },
        })
      } else {
        filterParamsAND.push({
          nft_token_id: {
            equals: nftTokenId,
            mode: 'insensitive',
          },
        })
      }
    }
    const nftToken =
      queryParams.nftToken ??
      queryParams.erc721Token?.toString().toLowerCase() ??
      queryParams.erc1155Token?.toString().toLowerCase()
    if (nftToken) {
      if (Array.isArray(nftToken)) {
        filterParamsAND.push({
          nft_token: {
            in: [...nftToken],
            mode: 'insensitive',
          },
        })
      } else {
        filterParamsAND.push({
          nft_token: {
            equals: nftToken,
            mode: 'insensitive',
          },
        })
      }
    }
    const nftType = queryParams.nftType?.toString().toUpperCase()
    if (nftType) {
      filterParamsAND.push({
        nft_type: {
          equals: nftType,
          mode: 'insensitive',
        },
      })
    }
    const chainId = queryParams.chainId
    if (chainId) {
      if (Array.isArray(chainId)) {
        filterParamsAND.push({
          chain_id: {
            in: [...chainId.map((c) => c.toString(10))],
            mode: 'insensitive',
          },
        })
      } else {
        filterParamsAND.push({ chain_id: chainId.toString(10) })
      }
    }
    const maker = queryParams.maker?.toString().toLowerCase()
    if (maker) {
      filterParamsAND.push({
        maker: {
          equals: maker,
          mode: 'insensitive',
        },
      })
    }
    const taker = queryParams.taker?.toString().toLowerCase()
    if (taker) {
      filterParamsAND.push({
        taker: {
          equals: taker,
          mode: 'insensitive',
        },
      })
    }
    const nonce = queryParams.nonce
    if (nonce) {
      if (Array.isArray(nonce)) {
        filterParamsAND.push({
          nonce: {
            in: [...nonce],
            mode: 'insensitive',
          },
        })
      } else {
        filterParamsAND.push({
          nonce: {
            equals: nonce,
            mode: 'insensitive',
          },
        })
      }
    }
    const sellOrBuyNft = queryParams.sellOrBuyNft?.toString()
    if (sellOrBuyNft === 'sell') {
      filterParamsAND.push({
        direction: '0',
      })
    } else if (sellOrBuyNft === 'buy') {
      filterParamsAND.push({
        direction: '1',
      })
    }
    const direction = queryParams.direction?.toString()
    if (direction === '0') {
      filterParamsAND.push({
        direction: '0',
      })
    } else if (direction === '1') {
      filterParamsAND.push({
        direction: '1',
      })
    }
    // Convenience filter param (technically you can do taker=0x000000 but thats a little clunk for a GET url without having the address handy)
    const visibility = queryParams.visibility?.toString()
    if (visibility) {
      if (visibility === 'public') {
        filterParamsAND.push({
          taker: {
            equals: '0x0000000000000000000000000000000000000000',
          },
        })
      }
    }
    const orderStatus =
      queryParams.status?.toString() ?? queryParams.order_status?.toString() ?? queryParams.orderStatus?.toString()
    if (orderStatus) {
      if (orderStatus === 'all') {
        // skip adding a filter
      } else if (orderStatus === 'filled') {
        filterParamsAND.push({
          order_status: 'filled',
        })
      } else if (orderStatus === 'expired') {
        filterParamsAND.push({
          order_status: 'expired',
        })
        filterParamsAND.push({
          expiry_datetime: {
            lte: new Date(),
          },
        })
      } else if (orderStatus === 'cancelled') {
        filterParamsAND.push({
          order_status: 'cancelled',
        })
      } else if (orderStatus === 'open') {
        filterParamsAND.push({
          order_status: null,
        })
        filterParamsAND.push({
          expiry_datetime: {
            gt: new Date(),
          },
        })
      }
    } else {
      // By default, only fetch open orders (unfilled, unexpired, uncancelled)
      filterParamsAND.push({
        order_status: null,
      })
      filterParamsAND.push({
        expiry_datetime: {
          gt: new Date(),
        },
      })
    }

    const orderValidity = queryParams.valid?.toString()
    if (orderValidity === 'all') {
      //
    } else {
      // By default, only show valid orders
      filterParamsAND.push({
        order_valid: true,
      })
    }

    // Limit for query
    const limitQueryParam = queryParams.limit?.toString()
    let limit: number = DEFAULT_ITEM_QUERY_LIMIT
    if (limitQueryParam) {
      try {
        const maybeLimit = parseInt(limitQueryParam)
        if (isNaN(maybeLimit)) {
          // do nothing
        } else {
          // Cap at 500
          const limitWithTopBoundary = Math.min(maybeLimit, MAX_ITEM_QUERY_LIMIT)
          // Can do negative to wrap around orderbook
          const limitWithBottomBoundary = Math.max(limitWithTopBoundary, -MAX_ITEM_QUERY_LIMIT)
          limit = limitWithBottomBoundary
        }
      } catch (e) {
        logger.info('APIOrderbook: Invalid limit query param', { queryParams, limit, limitQueryParam })
        // swallow
      }
    }

    // Offset for query
    const offsetQueryParam = queryParams.offset?.toString()
    let offset: number | undefined = undefined
    if (offsetQueryParam) {
      try {
        const maybeOffset = parseInt(offsetQueryParam)
        if (isNaN(maybeOffset)) {
          // do nothing
        } else if (maybeOffset >= 0) {
          offset = maybeOffset
        }
      } catch (e) {
        logger.info('APIOrderbook: Invalid offset query param', { queryParams, offset, offsetQueryParam })
        // swallow
      }
    }

    const queryRes = await prisma.orders_with_latest_status.findMany({
      where: {
        AND: [...filterParamsAND],
      },
      orderBy: {
        date_created: 'desc',
      },
      take: limit,
      skip: offset,
    })
    const formatted: Array<OrderPayload> = queryRes.map(orderToOrderPayload)

    const response = {
      orders: formatted,
    }
    res.json(response)
  })

  // Employee endpoint that can help update
  orderRouter.post('/order', async (req, res: Response, next) => {
    const order = req.body.order
    const orderMetadataFromApp: Record<string, string> = req.body.metadata ?? {}
    const chainId: string | number = req.body.chainId?.toString()

    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from POST body'))
    }
    if (!order) {
      return res.status(400).json(createApiError('ORDER_MISSING', 'order missing from POST body'))
    }

    let signedOrder: SignedNftOrderV4Serialized
    try {
      signedOrder = signedNftOrderV4SerializedSchema.parse(order)
    } catch (e: any) {
      logger.info('Validation error in order post handler', { error: e })
      return res.status(400).json(createApiError('ORDER_VALIDATION_ERROR', e))
    }

    if (!isHexString(signedOrder.taker)) {
      return res
        .status(400)
        .json(
          createApiError('INVALID_TAKER', `Invalid taker address (not a hex address). Received: ${signedOrder.taker}`)
        )
    }
    if (!isHexString(signedOrder.maker)) {
      return res
        .status(400)
        .json(
          createApiError('INVALID_MAKER', `Invalid maker address (not a hex address). Received: ${signedOrder.maker}`)
        )
    }
    if (!isHexString(signedOrder.erc20Token)) {
      return res
        .status(400)
        .json(
          createApiError(
            'INVALID_ERC20_TOKEN',
            `Invalid erc20Token address (not a hex address). Received: ${signedOrder.erc20Token}`
          )
        )
    }

    let jsonRpcUrl: string | null = null
    let parsedChainId: number | null = null

    try {
      parsedChainId = parseInt(chainId.toString(10))
    } catch (e) {
      return res.status(400).json(createApiError('INVALID_CHAIN_ID', `Unable to parse chainId provided: ${chainId}`))
    }
    if (parsedChainId === undefined || isNaN(parsedChainId)) {
      return res
        .status(400)
        .json(createApiError('UNSUPPORTED_CHAIN_ID', `Unsupported chainId: ${chainId} (parsed: ${parsedChainId})`))
    }
    try {
      jsonRpcUrl = getJsonRpcUrlByChainId(chainId.toString(10))
    } catch (e) {
      return res.status(400).json(createApiError('UNSUPPORTED_CHAIN_ID', `Unsupported chainId: ${chainId}`))
    }
    if (!jsonRpcUrl) {
      return res.status(400).json(createApiError('UNSUPPORTED_CHAIN_ID', `Unsupported chainId: ${chainId}`))
    }

    const jsonRpc = new JsonRpcBatchProvider(jsonRpcUrl, parsedChainId)

    const sdk = new NftSwapV4(jsonRpc, undefined as any, parsedChainId, {
      // Provide exchangeproxy address manually so we don't depend on the sdk for addresses
      zeroExExchangeProxyContractAddress: getZeroExContract(chainId.toString(10)),
    })

    let isValidSig = false

    // batch async calls (todo: multicall this)
    const validatePromise = sdk.validateSignature(signedOrder)
    const fillableDataPromise = sdk.checkOrderCanBeFilledMakerSide(signedOrder)
    const orderStatusPromise = sdk.getOrderStatus(signedOrder)

    const makerAsset = sdk.getMakerAsset(signedOrder)

    try {
      isValidSig = await validatePromise
    } catch (e) {
      // not valid. noop
      logger.debug(`orderRouter:POST order: Invalid signature on order`, { e, signedOrder, order, isValidSig })
    }

    if (!isValidSig) {
      return res.status(400).json(createApiError('INVALID_ORDER_SIGNATURE', 'Signature on signed order is invalid'))
    }

    try {
      const fillableData = await fillableDataPromise
      if (!fillableData.hasBalance) {
        return res
          .status(400)
          .json(
            createApiError(
              'INSUFFICIENT_MAKER_BALANCE',
              `Maker does not have sufficient balance of ${makerAsset.tokenAddress} (${makerAsset.type})`
            )
          )
      }
      if (!fillableData.isApproved) {
        return res
          .status(400)
          .json(
            createApiError(
              'INSUFFICIENT_MAKER_ALLOWANCE',
              `Maker does not have sufficient allowance of ${makerAsset.tokenAddress} (${makerAsset.type})`
            )
          )
      }
    } catch (e) {
      logger.info(`Error fetching allowance or balance data`, { e, signedOrder })
      return res
        .status(400)
        .json(
          createApiError(
            'ERROR_FETCHING_ORDER_DATA',
            `Error looking up maker balance and approval data. Order may be using incorrect/bad token ${makerAsset.tokenAddress}, chainId: ${chainId}.`
          )
        )
    }

    try {
      const orderStatus = await orderStatusPromise
      switch (orderStatus) {
        case OrderStatusV4.Expired:
          return res
            .status(400)
            .json(createApiError('ORDER_EXPIRED', `Order expired: Expiry unix timestamp: ${signedOrder.expiry}`))

        case OrderStatusV4.Invalid:
          return res
            .status(400)
            .json(createApiError('ORDER_INVALID', `Order marked invalid per 0x V4 orderStatus RPC call`))
        case OrderStatusV4.Unfillable:
          return res
            .status(400)
            .json(createApiError('ORDER_UNFILLABLE', `Order marked unfillable per 0x V4 orderStatus RPC call`))

        case OrderStatusV4.Fillable:
          // valid order, do nothing!
          break
        default:
          break
      }
    } catch (e) {
      logger.info(`Error fetching order status`, { e, signedOrder })

      return res
        .status(400)
        .json(createApiError('ERROR_FETCHING_ORDER_STATUS', `Promblem looking up order status via 0x v4 ExchangeProxy`))
    }

    const orderDb = nftOrderToDbModel(signedOrder, chainId.toString(), orderMetadataFromApp)

    try {
      const createdOrder = await prisma.orders_v4_nfts.create({
        data: {
          ...orderDb,
          fees: orderDb.fees ?? [],
          order_valid: true,
          date_last_validated: new Date(),
        },
      })

      const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })
      const blockNumberTopic = pubsub.topic(PUBSUB_TOPICS.ValidateOrderStatus)

      const blockNumberMessage: OrderStatusUpdateRequestEvent = {
        data: {
          orderNonce: signedOrder.nonce,
          chainId: chainId.toString(10),
        },
        eventName: 'order.validate-status',
        topic: PUBSUB_TOPICS.ValidateOrderStatus,
      }

      // const _messageId = await blockNumberTopic.publishMessage({
      //   json: blockNumberMessage,
      //   orderingKey: chainId.toString(10),
      //   attributes: {
      //     chainId: chainId.toString(10),
      //     nonce: signedOrder.nonce,
      //   },
      // })

      const dbResult = await prisma.orders_with_latest_status.findFirst({
        where: {
          nonce: createdOrder.nonce,
        },
      })

      delete (dbResult as any).system_metadata

      const orderPayload = orderToOrderPayload(dbResult!)

      return res.status(200).json(orderPayload)
    } catch (e: any) {
      console.log(e)
      logger.error('API: Error creating order', { error: e })
      return next(e)
      // return res.status(400).json(createApiError('ORDER_CREATION_ERROR', e))
    }
  })

  return orderRouter
}

export { createOrderbookRouter }
