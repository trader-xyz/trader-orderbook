import { PubSub } from '@google-cloud/pubsub'
import * as Sentry from '@sentry/node'
import { getPrismaClient } from '../../prisma-client'
import type { NftOpenseaScrapeCollectionByAddressRequestEvent } from '../utils/messaging-types'
import { PubSubMessage, PUBSUB_SUBSCRIPTIONS } from '../utils/pubsub'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { DEFAULT_SENTRY_DSN, DEFAULT_SENTRY_SAMPLE_RATE, GCP_PROJECT_ID } from '../../default-config'
import {
  fetchOpenseaCollectionByContractAddress,
  OpenSeaV1CollectionByContractAddressResponsePayload,
} from '../utils/opensea'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const subscriptionId = PUBSUB_SUBSCRIPTIONS.NftOpenSeaCollectionScrape

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['consumer:nft-opensea-collection-by-address-sync'])

export const upsertOpenSeaCollectionScrapedData = async (
  openseaCollectionByContractAddress: OpenSeaV1CollectionByContractAddressResponsePayload
) => {
  const upsertRes = await prisma.opensea_collection_metadata_by_contract_address_v1.upsert({
    where: {
      address: openseaCollectionByContractAddress.address?.toLowerCase(),
    },
    create: {
      ...openseaCollectionByContractAddress,
      address: openseaCollectionByContractAddress.address?.toLowerCase(),
      owner: openseaCollectionByContractAddress.owner?.toString(),
      dev_buyer_fee_basis_points: openseaCollectionByContractAddress.dev_buyer_fee_basis_points?.toString(),
      dev_seller_fee_basis_points: openseaCollectionByContractAddress.dev_seller_fee_basis_points?.toString(),
      opensea_buyer_fee_basis_points: openseaCollectionByContractAddress.opensea_buyer_fee_basis_points?.toString(),
      opensea_seller_fee_basis_points: openseaCollectionByContractAddress.opensea_seller_fee_basis_points?.toString(),
      buyer_fee_basis_points: openseaCollectionByContractAddress.buyer_fee_basis_points?.toString(),
      seller_fee_basis_points: openseaCollectionByContractAddress.seller_fee_basis_points?.toString(),
      collection: {
        ...openseaCollectionByContractAddress.collection,
      } as any,
    },
    update: {
      ...openseaCollectionByContractAddress,
      address: openseaCollectionByContractAddress.address?.toLowerCase(),
      owner: openseaCollectionByContractAddress.owner?.toString(),
      dev_buyer_fee_basis_points: openseaCollectionByContractAddress.dev_buyer_fee_basis_points?.toString(),
      dev_seller_fee_basis_points: openseaCollectionByContractAddress.dev_seller_fee_basis_points?.toString(),
      opensea_buyer_fee_basis_points: openseaCollectionByContractAddress.opensea_buyer_fee_basis_points?.toString(),
      opensea_seller_fee_basis_points: openseaCollectionByContractAddress.opensea_seller_fee_basis_points?.toString(),
      buyer_fee_basis_points: openseaCollectionByContractAddress.buyer_fee_basis_points?.toString(),
      seller_fee_basis_points: openseaCollectionByContractAddress.seller_fee_basis_points?.toString(),
      collection: {
        ...openseaCollectionByContractAddress.collection,
      } as any,
      date_scrape_updated: new Date(),
    },
  })
  return upsertRes
}

const startAsync = async () => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  const newBlockSub = pubsub.subscription(subscriptionId, {
    flowControl: {
      maxMessages: 3,
    },
  })

  const handleMessage = async (message: PubSubMessage) => {
    const msgJson: NftOpenseaScrapeCollectionByAddressRequestEvent = JSON.parse(message.data)

    if (msgJson.eventName !== 'nft.opensea.scrape.collection-by-address') {
      logger.log('debug', `Unknown event, not sure how to handle`, { msgJson, message })
      throw new Error(`Unknown message eventName: ${msgJson.eventName}`)
    }

    console.log(message)

    // TODO(johnrjj) - validate messages with zod
    const contractAddress = msgJson.data.contractAddress.toLowerCase()
    const chainId = msgJson.data.chainId

    try {
      const openseaCollectionByContractAddress = await fetchOpenseaCollectionByContractAddress(contractAddress, chainId)

      if (!openseaCollectionByContractAddress) {
        logger.error(`OpenSeaCollectionByAddressSync: Was unable to index ${contractAddress}`, {
          contractAddress,
          openseaCollectionByContractAddress,
        })
        return
        // Should we throw??
        // throw new Error('DLQ:Unable to fetch');
      }
      const upsertedRes = await upsertOpenSeaCollectionScrapedData(openseaCollectionByContractAddress)
      await message.ack()
      logger.log(
        'debug',
        `OpenSeaCollectionByAddressSync: Upserted ${upsertedRes.address} collection (${upsertedRes.name})`,
        { message, upsertedRes }
      )
    } catch (e) {
      logger.log('error', `OpenSeaCollectionByAddressSync: Something went wrong!`, { message, e })
      message.nack()
      throw e
    }
  }

  newBlockSub.on('message', handleMessage)
}

startAsync()
