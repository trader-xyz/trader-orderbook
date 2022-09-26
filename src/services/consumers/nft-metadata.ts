import * as Sentry from '@sentry/node'
import { PubSub } from '@google-cloud/pubsub'
import { v4 as uuid } from 'uuid'
// import type { Prisma } from '@prisma/client'
import { getPrismaClient } from '../../prisma-client'
import {
  BlockNumberUpdateEvent,
  NftMetadataCollectionRequestEvent,
  NftMetadataRequestEvent,
} from '../utils/messaging-types'
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
import { fetchCollection, fetchNftMetadataFromAlchemy, getNftMetadataOnAnyChain } from '../utils/nfts'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const subscriptionId = PUBSUB_SUBSCRIPTIONS.NftMetadataUpdateHandlerSub

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['consumer:nft-metadata-request'])
const startAsync = async () => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  const nftMetadataUpdateRequest = pubsub.subscription(subscriptionId, {
    flowControl: {
      maxMessages: 5,
    },
  })

  const handleMessage = async (message: PubSubMessage) => {
    const msgJson: NftMetadataRequestEvent | NftMetadataCollectionRequestEvent = JSON.parse(message.data)

    if (msgJson.eventName === 'nft.metadata.update.individual') {
      const individualNft: NftMetadataRequestEvent = msgJson

      const chainId = individualNft.data.chainId
      const contractAddress = individualNft.data.contractAddress
      const tokenId = individualNft.data.tokenId
      logger.info(
        `NftMetadata: Received NFT Metadata update request for token id ${tokenId} on contract ${contractAddress}. Looking up data...`,
        {
          chainId,
          contractAddress,
          tokenId,
        }
      )

      const nftData = await getNftMetadataOnAnyChain(contractAddress, tokenId, chainId)

      if (!nftData.tokenURI) {
        logger.error(`NftMetadata: Metadata lookup failed for ${contractAddress}, tokenId ${tokenId}`, {
          nftData,
          chainId,
          contractAddress,
          tokenId,
        })
        throw new Error('Zora Metadata method failed')
      }

      const createdNftData = await prisma.nft_metadata.create({
        data: {
          chain_id: chainId,
          token_address: nftData.tokenAddress,
          token_id: nftData.tokenId,
          token_uri: nftData.tokenURI,
          attributes: nftData.attributes,
          content_url: nftData.contentURL,
          content_url_mime_type: nftData.contentURLMimeType,
          description: nftData.description,
          external_link: nftData.externalLink,
          image_url: nftData.imageURL,
          metadata: nftData.metadata,
          name: nftData.name,
          token_url: nftData.tokenURL,
          token_url_mime_type: nftData.tokenURLMimeType,
        },
      })

      logger.info(`NftMetadata: Inserted NFT metadata for tokenId ${tokenId} on contract ${contractAddress}`, {
        nftData,
        createdNftData,
        chainId,
        contractAddress,
        tokenId,
      })

      await message.ack()

      // const nftDataFromAlchemy = await fetchNftMetadataFromAlchemy(contractAddress, tokenId)
      return nftData
    }

    if (msgJson.eventName === 'nft.metadata.update.collection') {
      const collectionMsg: NftMetadataCollectionRequestEvent = msgJson

      const chainId = collectionMsg.data.chainId
      const contractAddress = collectionMsg.data.contractAddress
      const startToken = collectionMsg.data.startToken

      logger.error(`NftMetadata: Collection Sync not yet implemented`)
      throw new Error(`Collection Sync not yet implemented`)

      //   const collectionData = await fetchCollection(contractAddress)
      //   await message.ack()
    }

    logger.debug(`NftMetadata: Unknown event, not sure how to handle`, msgJson)
    throw new Error(`Unknown message eventName: ${(msgJson as any).eventName}`)

    // TODO(johnrjj) - validate messages with zod
  }

  nftMetadataUpdateRequest.on('message', handleMessage)

  logger.info(`NFTMetadata: Service started`)
}

startAsync()
