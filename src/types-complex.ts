import type { Prisma } from '@prisma/client'
import type { FeeStructSerialized, PropertyStructSerialized, SignatureStruct } from './types'

// Comment out when running zod generate
export interface NftOrderV4DatabaseModel {
  id: string
  maker: string
  taker: string
  expiry: string
  expiry_datetime: Date
  nonce: string
  erc20_token: string
  erc20_token_amount: string
  fees: Array<FeeStructSerialized> | null
  nft_token: string
  nft_token_id: string
  nft_token_amount: string
  nft_token_properties: Array<PropertyStructSerialized>
  system_metadata: Record<any, any>
  app_metadata: Record<any, any>
  chain_id: string
  verifying_contract: string
  direction: string
  signature: SignatureStruct
  nft_type: string
}

export type orders_v4_nfts = {
  id: string
  maker: string
  taker: string
  expiry: string
  expiry_datetime: Date
  nonce: string
  erc20_token: string
  erc20_token_amount: string
  fees: Prisma.JsonValue | null
  nft_token: string
  nft_token_id: string
  nft_token_amount: string
  nft_token_properties: Prisma.JsonValue | null
  system_metadata: Prisma.JsonValue | null
  app_metadata: Prisma.JsonValue | null
  chain_id: string
  verifying_contract: string
  direction: string
  signature: Prisma.JsonValue
  nft_type: string
  date_added: Date | null
  date_last_updated: Date | null
}
