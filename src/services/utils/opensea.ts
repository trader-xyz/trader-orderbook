import createFetch from '@vercel/fetch'
import { CHAIN_IDS, DEFAULT_OPENSEA_API_KEY } from '../../default-config'

const fetch = createFetch()

export interface OpenSeaV1CollectionByContractAddressResponsePayload {
  collection: OpenSeaCollectionData
  address: string
  asset_contract_type: string
  created_date: string
  name: string
  nft_version: string
  opensea_version?: null
  owner: number
  schema_name: string
  symbol: string
  total_supply: string
  description: string
  external_link: string
  image_url: string
  default_to_fiat: boolean
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  buyer_fee_basis_points: number
  seller_fee_basis_points: number
  payout_address: string
}

export interface OpenSeaCollectionData {
  banner_image_url: string
  chat_url?: null
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: string
  dev_seller_fee_basis_points: string
  discord_url: string
  display_data: DisplayData
  external_url: string
  featured: boolean
  featured_image_url?: null
  hidden: boolean
  safelist_request_status: string
  image_url: string
  is_subject_to_whitelist: boolean
  large_image_url?: null
  medium_username?: null
  name: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: string
  opensea_seller_fee_basis_points: string
  payout_address: string
  require_email: boolean
  short_description?: null
  slug: string
  telegram_url?: null
  twitter_username?: null
  instagram_username: string
  wiki_url?: null
  is_nsfw: boolean
}

export interface DisplayData {
  card_display_style: string
}

// https://api.opensea.io/api/v1/asset_contract/0xED5AF388653567Af2F388E6224dC7C4b3241C544
// NOTE(johnrjj) - This endpoint REQUIRES X-API-KEY header
const fetchOpenseaCollectionByContractAddress = async (
  contractAddress: string,
  chainId: string
): Promise<OpenSeaV1CollectionByContractAddressResponsePayload | null> => {
  let fetchUrl = `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`
  if (chainId === CHAIN_IDS.ROPSTEN) {
    fetchUrl = `https://testnets-api.opensea.io/api/v1/asset_contract/${contractAddress}`
  }

  let headers: Record<string, string> = {
    'X-API-KEY': DEFAULT_OPENSEA_API_KEY,
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    headers = {}
  }

  const fetchRes: OpenSeaV1CollectionByContractAddressResponsePayload | null = await fetch(fetchUrl, {
    headers,
  }).then((preJsonRes) => {
    console.log('preJsonRes', preJsonRes)
    if (preJsonRes.status === 404) {
      return null
    }
    return preJsonRes.json()
  })

  return fetchRes
}

/**
 * Fetching by collection slug yields much more data (e.g. stats, etc) than by address
 * However, we have to fetch by address first to figure out the slug id
 * @param collectionSlug
 * @returns Collection data by slug (includes stats and other data)
 */
const fetchOpenseaCollectionBySlug = async (collectionSlug: string) => {
  const collectionSlugData: CollectionDataBySlugResponse = await fetch(
    `https://api.opensea.io/api/v1/collection/${collectionSlug}`
  ).then((x) => x.json())
  return collectionSlugData
}

export interface CollectionDataBySlugResponse {
  collection: CollectionBySlugData
}

export interface CollectionBySlugData {
  editors: string[]
  payment_tokens: PaymentToken[]
  primary_asset_contracts: PrimaryAssetContract[]
  traits: Record<string, Record<string, string>>
  stats: Stats
  banner_image_url: string
  chat_url: any
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: string
  dev_seller_fee_basis_points: string
  discord_url: string
  display_data: DisplayData
  external_url: string
  featured: boolean
  featured_image_url: any
  hidden: boolean
  safelist_request_status: string
  image_url: string
  is_subject_to_whitelist: boolean
  large_image_url: any
  medium_username: any
  name: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: string
  opensea_seller_fee_basis_points: string
  payout_address: string
  require_email: boolean
  short_description: any
  slug: string
  telegram_url: any
  twitter_username: any
  instagram_username: string
  wiki_url: any
  is_nsfw: boolean
}

export interface PaymentToken {
  id: number
  symbol: string
  address: string
  image_url: string
  name: string
  decimals: number
  eth_price: number
  usd_price: number
}

export interface PrimaryAssetContract {
  address: string
  asset_contract_type: string
  created_date: string
  name: string
  nft_version: string
  opensea_version: any
  owner: number
  schema_name: string
  symbol: string
  total_supply: string
  description: string
  external_link: string
  image_url: string
  default_to_fiat: boolean
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  buyer_fee_basis_points: number
  seller_fee_basis_points: number
  payout_address: string
}

export interface Stats {
  one_day_volume: number
  one_day_change: number
  one_day_sales: number
  one_day_average_price: number
  seven_day_volume: number
  seven_day_change: number
  seven_day_sales: number
  seven_day_average_price: number
  thirty_day_volume: number
  thirty_day_change: number
  thirty_day_sales: number
  thirty_day_average_price: number
  total_volume: number
  total_sales: number
  total_supply: number
  count: number
  num_owners: number
  average_price: number
  num_reports: number
  market_cap: number
  floor_price: number
}

export interface DisplayData {
  card_display_style: string
}

export { fetchOpenseaCollectionByContractAddress }
