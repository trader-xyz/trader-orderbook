import * as Sentry from '@sentry/node'
import { PubSub } from '@google-cloud/pubsub'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { PUBSUB_TOPICS } from '../utils/pubsub'
import type { BlockNumberUpdateEvent } from '../utils/messaging-types'
import {
  CHAIN_IDS,
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
  GCP_PROJECT_ID,
  getWsRpcUrlByChainId,
} from '../../default-config'

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? DEFAULT_SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

interface AlchemyBlockHeader {
  number: number
  hash: string
  parentHash: string
  nonce: string
  sha3Uncles: string
  logsBloom: string
  transactionRoot: string
  stateRoot: string
  receiptsRoot: string
  miner: string
  extraData: string
  gasLimit: number
  gasUsed: number
  timestamp: number | string
  baseFeePerGas?: number
}

const logger = getLoggerForService(ServiceNamesLogLabel['producer:block-number'])

const runBlockWatcherAsync = async (chainId: string) => {
  const alchemyRpcUrl = getWsRpcUrlByChainId(chainId)
  if (!alchemyRpcUrl) {
    logger.error('Alchemy RPC Url null', { alchemyRpcUrl, chainId })
    throw new Error('Alchemy RPC Url null')
  }
  const web3 = createAlchemyWeb3(alchemyRpcUrl)

  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  const blockNumberTopic = pubsub.topic(PUBSUB_TOPICS.BlockNumberUpdate)

  const handleNewBlock = async (error: Error, blockHeader: AlchemyBlockHeader) => {
    if (error) {
      console.log(error)
      throw new Error('Error connecting')
    }
    const blockNumber = blockHeader.number
    const timestamp = blockHeader.timestamp

    logger.info(`BlockPublisher: New block for chain ${chainId} (${blockNumber}) detected. Publishing event...`, {
      timestamp,
      blockNumber,
      chainId,
    })

    const blockNumberMessage: BlockNumberUpdateEvent = {
      data: {
        blockNumber: blockNumber,
        chainId: chainId,
        timestamp: timestamp.toString(),
        hash: blockHeader.hash,
        parentHash: blockHeader.parentHash,
        nonce: blockHeader.nonce,
      },
      eventName: 'block-number.update',
      topic: PUBSUB_TOPICS.BlockNumberUpdate,
    }

    const messageId = await blockNumberTopic.publishMessage({
      json: blockNumberMessage,
      orderingKey: chainId,
      attributes: {
        chainId: chainId,
        blockNumber: blockNumber.toString(10),
      },
    })

    logger.silly(`BlockPublisher: Posted new block for chain ${chainId} (${blockNumber}) to 'new block' topic.`, {
      timestamp,
      blockNumber,
      chainId,
      blockNumberMessage,
      messageId,
    })
  }

  web3.eth.subscribe('newBlockHeaders', handleNewBlock)
}

interface Web3JsBlockHeader {
  number: number
  hash: string
  parentHash: string
  nonce: string
  sha3Uncles: string
  logsBloom: string
  transactionRoot: string
  stateRoot: string
  receiptRoot: string
  miner: string
  extraData: string
  gasLimit: number
  gasUsed: number
  timestamp: number | string
}

const CHAINS: string[] = [
  CHAIN_IDS.GAUSS,
  CHAIN_IDS.GIL,
]

CHAINS.forEach((chain) => {
  runBlockWatcherAsync(chain)
})
