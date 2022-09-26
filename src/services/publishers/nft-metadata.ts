import * as Sentry from '@sentry/node'
import { PubSub } from '@google-cloud/pubsub'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { PUBSUB_TOPICS } from '../utils/pubsub'
import type { NftMetadataCollectionRequestEvent, NftMetadataRequestEvent } from '../utils/messaging-types'
import {
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
  GCP_PROJECT_ID,
  getWsRpcUrlByChainId,
} from '../../default-config'

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? DEFAULT_SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const logger = getLoggerForService(ServiceNamesLogLabel['producer:nft-metadata-request'])

/**
 *
 */
interface PublishNftMetadataUpdateRequestOptions {
  tokenId: string | null
  collection: boolean | null
  startToken: string | null
}

const publishMessageToTopic = async (
  nftMetadataMessage: NftMetadataRequestEvent | NftMetadataCollectionRequestEvent,
  chainId: string
) => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })
  const nftUpdateTopic = pubsub.topic(PUBSUB_TOPICS.NftMetadataUpdateRequest)
  const messageId = await nftUpdateTopic.publishMessage({
    json: nftMetadataMessage,
    orderingKey: chainId,
    attributes: {
      chainId: chainId,
    },
  })

  return messageId
}

const publishNftMetadataUpdateRequest = async (
  contractAddress: string,
  chainId: string,
  options: PublishNftMetadataUpdateRequestOptions
): Promise<string> => {
  const alchemyRpcUrl = getWsRpcUrlByChainId(chainId)
  if (!alchemyRpcUrl) {
    logger.error('Alchemy RPC Url null', { alchemyRpcUrl, chainId })
    throw new Error('Alchemy RPC Url null')
  }

  if (options.tokenId) {
    const nftMetadataUpdateRequestMessage: NftMetadataRequestEvent = {
      data: {
        chainId: chainId,
        contractAddress: contractAddress,
        tokenId: options.tokenId,
      },
      eventName: 'nft.metadata.update.individual',
      topic: PUBSUB_TOPICS.NftMetadataUpdateRequest,
    }

    const messageId = await publishMessageToTopic(nftMetadataUpdateRequestMessage, chainId)

    logger.log('info', `NftMetadataPublisher: Posted message ${messageId}`, nftMetadataUpdateRequestMessage)
    return messageId
  }

  if (options.collection) {
    const nftMetadataUpdateCollectionRequestMessage: NftMetadataCollectionRequestEvent = {
      data: {
        chainId: chainId,
        contractAddress: contractAddress,
        startToken: options.startToken ?? undefined,
      },
      eventName: 'nft.metadata.update.collection',
      topic: PUBSUB_TOPICS.NftMetadataUpdateRequest,
    }

    const messageId = await publishMessageToTopic(nftMetadataUpdateCollectionRequestMessage, chainId)

    logger.log('info', `NftMetadataPublisher: Posted message ${messageId}`, nftMetadataUpdateCollectionRequestMessage)
    return messageId
  }

  logger.error(`NftMetadataPublisher: Unknown nft metadata configuration`, { options, contractAddress, chainId })
  throw new Error('Unknown configuration')
}

const publishNftMetadataForNftRequest = (contractAddress: string, tokenId: string, chainId: string) => {
  return publishNftMetadataUpdateRequest(contractAddress, chainId, { tokenId, collection: null, startToken: null })
}

const publishNftMetadataForNftCollectionRequest = (
  contractAddress: string,
  chainId: string,
  startToken: string | null
) => {
  return publishNftMetadataUpdateRequest(contractAddress, chainId, {
    tokenId: null,
    collection: true,
    startToken: startToken,
  })
}

export { publishNftMetadataForNftRequest, publishNftMetadataForNftCollectionRequest }
