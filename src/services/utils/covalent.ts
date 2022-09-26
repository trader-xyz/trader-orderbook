import { encode } from 'base-64'

// https://api.covalenthq.com/v1/1/nft_market/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/?quote-currency=USD&format=JSON&from=2022-01-01

import createFetch from '@vercel/fetch'
import { DEFAULT_COVALENT_API_KEY, DEFAULT_OPENSEA_API_KEY } from '../../default-config'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'

const fetch = createFetch()

export interface NftHistoryByDay {
  chain_id: number
  collection_name: string
  collection_address: string
  collection_ticker_symbol: string
  opening_date: string
  volume_wei_day: string
  volume_quote_day: number
  average_volume_wei_day: string
  average_volume_quote_day: number
  unique_token_ids_sold_count_day: number
  floor_price_wei_7d: string
  floor_price_quote_7d: number
  gas_quote_rate_day: number
  quote_currency: string
}

export interface NftHistoricalDataPayload {
  updated_at: string
  items: NftHistoryByDay[]
  pagination?: any
}

export interface CovalentResponse<T> {
  data: T
  error: boolean
  error_message?: any
  error_code?: any
}

const getNftHistory = async (collectionAddress: string, start?: Date, end?: Date) => {
  const defaultEnd = new Date()
  const defaultStart = subDays(defaultEnd, 30)

  const startFormatted = format(start ?? defaultStart, 'yyyy-MM-dd')
  const endFormatted = format(end ?? defaultEnd, 'yyyy-MM-dd')

  const nftHistoryResponse: CovalentResponse<NftHistoricalDataPayload> = await fetch(
    `https://api.covalenthq.com/v1/1/nft_market/collection/${collectionAddress}/?quote-currency=USD&format=JSON&from=${startFormatted}`,
    {
      headers: {
        //   Colon after just tells auth 'no password, only username'
        Authorization: 'Basic ' + encode(`${DEFAULT_COVALENT_API_KEY}:`),
      },
    }
  ).then((r) => r.json())

  return nftHistoryResponse
}

const bayc = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
getNftHistory(bayc)
  .then((x) => console.log(x))
  .catch((e) => console.log('err', e))
