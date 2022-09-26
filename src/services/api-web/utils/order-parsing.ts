import { orders_with_latest_status } from '@prisma/client'
import {
  SignedERC721OrderStructSerialized,
  SignedERC1155OrderStructSerialized,
  NftOrderV4Serialized,
  SignedNftOrderV4Serialized,
} from '@traderxyz/nft-swap-sdk/dist/sdk/v4/types'
import { randomUUID } from 'crypto'
import fromUnixTime from 'date-fns/fromUnixTime'
import { getZeroExContract } from '../../../default-config'
import { PropertyStructSerialized } from '../../../types'
import { NftOrderV4DatabaseModel } from '../../../types-complex'

const modelDbOrderToSdkOrder = (orderFromDb: orders_with_latest_status): NftOrderV4Serialized => {
  switch (orderFromDb.nft_type.toUpperCase()) {
    case 'ERC721':
      const erc721Order: SignedERC721OrderStructSerialized = {
        direction: parseInt(orderFromDb.direction),
        erc20Token: orderFromDb.erc20_token,
        erc20TokenAmount: orderFromDb.erc20_token_amount,
        erc721Token: orderFromDb.nft_token,
        erc721TokenId: orderFromDb.nft_token_id,
        erc721TokenProperties: (orderFromDb.nft_token_properties as any[]) ?? [],
        expiry: orderFromDb.expiry,
        fees: (orderFromDb.fees as any[]) ?? [],
        maker: orderFromDb.maker,
        nonce: orderFromDb.nonce,
        signature: orderFromDb.signature as any,
        taker: orderFromDb.taker,
      }
      return erc721Order
    case 'ERC1155':
      const erc1155Order: SignedERC1155OrderStructSerialized = {
        direction: parseInt(orderFromDb.direction),
        erc20Token: orderFromDb.erc20_token,
        erc20TokenAmount: orderFromDb.erc20_token_amount,
        erc1155Token: orderFromDb.nft_token,
        erc1155TokenId: orderFromDb.nft_token_id,
        erc1155TokenAmount: orderFromDb.nft_token_amount,
        erc1155TokenProperties: (orderFromDb.nft_token_properties as any[]) ?? [],
        expiry: orderFromDb.expiry,
        fees: (orderFromDb.fees as any[]) ?? [],
        maker: orderFromDb.maker,
        nonce: orderFromDb.nonce,
        signature: orderFromDb.signature as any,
        taker: orderFromDb.taker,
      }
      return erc1155Order
    default:
      throw new Error(`Unknown nft type ${orderFromDb.nft_type}`)
  }
}

const nftOrderToDbModel = (
  signedOrder: SignedNftOrderV4Serialized,
  chainId: string,
  orderMetadataFromApp: Record<string, string>
): NftOrderV4DatabaseModel => {
  const expiryDateTime = fromUnixTime(parseInt(signedOrder.expiry))

  let nftToken: string
  let nftTokenAmount: string
  let nftTokenId: string
  let nftType: string
  let nftTokenProperties: Array<PropertyStructSerialized> = []

  if ('erc1155Token' in signedOrder) {
    nftToken = signedOrder.erc1155Token
    nftTokenAmount = signedOrder.erc1155TokenAmount
    nftTokenId = signedOrder.erc1155TokenId
    nftType = 'ERC1155'
    nftTokenProperties = signedOrder.erc1155TokenProperties ?? []
  } else if ('erc721Token' in signedOrder) {
    nftToken = signedOrder.erc721Token
    nftTokenAmount = '1'
    nftTokenId = signedOrder.erc721TokenId
    nftType = 'ERC721'
    nftTokenProperties = signedOrder.erc721TokenProperties ?? []
  } else {
    throw new Error('typesafe')
  }

  const zeroExContractAddress = getZeroExContract(chainId)

  const dbResult: NftOrderV4DatabaseModel = {
    id: randomUUID(),
    chain_id: chainId,
    direction: signedOrder.direction.toString(),
    erc20_token: signedOrder.erc20Token,
    erc20_token_amount: signedOrder.erc20TokenAmount,
    expiry: signedOrder.expiry,
    expiry_datetime: expiryDateTime,
    maker: signedOrder.maker,
    taker: signedOrder.taker,
    nft_token: nftToken,
    nft_token_amount: nftTokenAmount,
    nft_token_id: nftTokenId,
    nft_type: nftType,
    nft_token_properties: nftTokenProperties,
    fees: signedOrder.fees,
    nonce: signedOrder.nonce,
    signature: signedOrder.signature,
    verifying_contract: zeroExContractAddress,
    app_metadata: {
      ...orderMetadataFromApp,
    },
    system_metadata: {
      foo: 'bazbot',
    },
  }
  return dbResult
}

export { nftOrderToDbModel, modelDbOrderToSdkOrder }
