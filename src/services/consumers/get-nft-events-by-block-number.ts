import * as Sentry from '@sentry/node'
import { PubSub } from '@google-cloud/pubsub'
import { v4 as uuid } from 'uuid'
import type { Prisma } from '@prisma/client'
import { getPrismaClient } from '../../prisma-client'
import { BlockNumberUpdateEvent } from '../utils/messaging-types'
import { PubSubMessage, PUBSUB_SUBSCRIPTIONS } from '../utils/pubsub'
import { JOBS } from '../utils/jobs'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import {
  getZeroExContract,
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
  GCP_PROJECT_ID,
  getJsonRpcUrlByChainId,
} from '../../default-config'
import { getOrderStatusLogsForBlocks } from './utils/exchange-events-parser'

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? DEFAULT_SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const subscriptionId = PUBSUB_SUBSCRIPTIONS.ProcessExchangeOrderUpdatesByBlockNumber
const jobName = JOBS.OrderUpdateByBlock

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['consumer:exchange-events-by-block-number'])

const fetchAndSaveOrderEvents = async (
  blockNumber: number,
  chainId: string,
  verifyingContract: string,
  blockHash: string,
  parentHash: string
) => {
  const blockData = { blockNumber, blockHash, chainId, verifyingContract, parentHash }
  logger.debug(`ExchangeEvents: Processing block ${blockNumber} on chain ${chainId}`, blockData)

  const maybeExistingStatus = await prisma.job_records.findFirst({
    select: {
      id: true,
    },
    where: {
      block_number: blockNumber,
      chain_id: chainId,
      job_name: jobName,
      verifying_contract: verifyingContract,
      hash: blockHash,
      parent_hash: parentHash,
    },
  })

  if (maybeExistingStatus?.id) {
    logger.silly(`ExchangeEvents: Already processed this block ${blockNumber} on chain ${chainId}. Exiting.`, blockData)
    return
  }

  const jsonRpcUrl = getJsonRpcUrlByChainId(chainId)

  const orderUpdateEvents = await getOrderStatusLogsForBlocks(jsonRpcUrl, verifyingContract, chainId, blockNumber)

  logger.silly(
    `ExchangeEvents: Found ${orderUpdateEvents.length} update events for block ${blockNumber} on chain ${chainId} `,
    { orderUpdateEvents, ...blockData }
  )

  try {
    const [jobRecordEntry, orderUpdatesCreated] = await prisma.$transaction([
      prisma.job_records.create({
        data: {
          chain_id: chainId.toString(),
          job_name: jobName,
          block_number: blockNumber,
          job_data: orderUpdateEvents as any,
          verifying_contract: verifyingContract,
          hash: blockHash,
          parent_hash: parentHash,
          id: uuid(),
        },
      }),
      prisma.order_status_v4_nfts.createMany({
        data: orderUpdateEvents.map((event) => {
          let orderStatus: string
          if (event.eventType === 'fill') {
            orderStatus = 'filled'
          } else if (event.eventType === 'cancel') {
            orderStatus = 'cancelled'
          } else {
            orderStatus = 'unknown'
          }

          const orderInput: Prisma.order_status_v4_nftsCreateManyInput = {
            order_status: orderStatus,
            address: event.address.toLowerCase(),
            block_hash: event.blockHash.toLowerCase(),
            block_number: event.blockNumber,
            data: event.data,
            name: event.name,
            parsed_args: event.parsedData as any,
            signature: event.signature,
            topic: event.topic,
            transaction_hash: event.transactionHash.toLowerCase(),
            nonce: event.parsedData.nonce.toLowerCase(),
            chain_id: chainId,
            verifying_contract: verifyingContract,
          }
          return orderInput
        }),
        skipDuplicates: true,
      }),
    ])

    logger.debug(
      `ExchangeEvents: Inserted ${orderUpdatesCreated.count} exchange events for block ${blockNumber} on chain ${chainId}`,
      { orderUpdatesCreated, jobRecordEntry, orderUpdateEvents, ...blockData }
    )
    return true
  } catch (e: any) {
    // "Unique constraint failed on the {constraint}"
    // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    const PRISMA_CLIENT_QUERY_ENGINE_ERROR_DUPLICATE_KEY = 'P2002'

    if (e.code === PRISMA_CLIENT_QUERY_ENGINE_ERROR_DUPLICATE_KEY) {
      logger.log('silly', `ExchangeEvents: Already have seen this block (duplicate key)`, {
        ...blockData,
        code: e.code,
        meta: e.meta,
        message: e.message,
      })
      return false
    }
    logger.log('error', 'Unknown error', { ...blockData, error: e })
    throw e
  }
}

const startAsync = async () => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  const newBlockSub = pubsub.subscription(subscriptionId, {
    flowControl: {
      maxMessages: 5,
    },
  })

  const handleMessage = async (message: PubSubMessage) => {
    const msgJson: BlockNumberUpdateEvent = JSON.parse(message.data)

    if (msgJson.eventName !== 'block-number.update') {
      logger.log('debug', `Unknown event, not sure how to handle`, msgJson)
      throw new Error(`Unknown message eventName: ${msgJson.eventName}`)
    }

    // TODO(johnrjj) - validate messages with zod

    const blockNumber = msgJson.data.blockNumber
    const chainId = msgJson.data.chainId
    const parentHash = msgJson.data.parentHash
    const hash = msgJson.data.hash

    try {
      await fetchAndSaveOrderEvents(blockNumber, chainId, getZeroExContract(chainId), hash, parentHash)
      await message.ack()
      logger.info(`ExchangeEvents: Acked ${blockNumber}`, { message })
    } catch (e) {
      throw e
    }
  }

  newBlockSub.on('message', handleMessage)
}

startAsync()
