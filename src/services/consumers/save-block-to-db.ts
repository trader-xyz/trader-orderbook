import * as Sentry from '@sentry/node'
import { PubSub } from '@google-cloud/pubsub'
import { StaticJsonRpcProvider, WebSocketProvider } from '@ethersproject/providers'
import fromUnixTime from 'date-fns/fromUnixTime'
import { getPrismaClient } from '../../prisma-client'
import type { BlockNumberUpdateEvent } from '../utils/messaging-types'
import { PubSubMessage, PUBSUB_SUBSCRIPTIONS } from '../utils/pubsub'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import {
  getJsonRpcUrlByChainId,
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
  GCP_PROJECT_ID,
} from '../../default-config'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const subscriptionId = PUBSUB_SUBSCRIPTIONS.SaveNewBlockToTable

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['consumer:save-block-to-db'])

const fetchAndSaveBlock = async (blockNumber: number, chainId: string, hash: string, parentHash: string) => {
  const logInfo = { blockNumber, chainId, hash, parentHash }

  logger.log('debug', `BlockHandler: Pulled event to process block ${blockNumber} on chain ${chainId}`, { ...logInfo })

  const blockRes = await prisma.blocks.findFirst({
    select: {
      number: true,
    },
    where: {
      number: blockNumber,
      chain_id: chainId,
      hash: hash,
      parent_hash: parentHash,
    },
  })

  if (blockRes?.number) {
    logger.log('silly', 'BlockHandler: Already processed this block, exiting as success', { ...logInfo })
    return
  }

  const jsonRpcUrl = getJsonRpcUrlByChainId(chainId)
  if (!jsonRpcUrl) {
    logger.error(`BlockHandler: RPC unknown for chain ${chainId}`, { ...logInfo })
    throw new Error(`RPC unknown for chain ${chainId}`)
  }
  const jsonProvider = new StaticJsonRpcProvider(jsonRpcUrl)

  const block = await jsonProvider.getBlock(blockNumber)

  try {
    const insertedBlock = await prisma.blocks.create({
      data: {
        chain_id: chainId,
        date_mined: fromUnixTime(block.timestamp),
        hash: block.hash,
        parent_hash: block.parentHash,
        nonce: block.nonce,
        number: block.number,
        timestamp: block.timestamp,
      },
    })

    logger.log('debug', `BlockHandler: Processed block: ${insertedBlock.number} on chain ${insertedBlock.chain_id}`, {
      block,
      ...logInfo,
    })

    return insertedBlock
  } catch (e: any) {
    // "Unique constraint failed on the {constraint}"
    // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    const PRISMA_CLIENT_QUERY_ENGINE_ERROR_DUPLICATE_KEY = 'P2002'

    if (e.code === PRISMA_CLIENT_QUERY_ENGINE_ERROR_DUPLICATE_KEY) {
      logger.log('silly', `BlockHandler: Already have seen this block`, {
        code: e.code,
        meta: e.meta,
        message: e.message,
        ...logInfo,
      })
      return null
    }
    logger.log('error', 'BlockHandler: Unknown error', { error: e, ...logInfo })
    throw e
  }
}

const startAsync = async () => {
  const pubsub = new PubSub({ projectId: GCP_PROJECT_ID })

  const newBlockSub = pubsub.subscription(subscriptionId, {
    flowControl: {
      maxMessages: 10,
    },
  })

  const handleMessage = async (message: PubSubMessage) => {
    const msgJson: BlockNumberUpdateEvent = JSON.parse(message.data)

    if (msgJson.eventName !== 'block-number.update') {
      logger.log('debug', `Unknown event, not sure how to handle`, { msgJson, message })
      throw new Error(`Unknown message eventName: ${msgJson.eventName}`)
    }

    // TODO(johnrjj) - validate messages with zod

    const blockNumber = msgJson.data.blockNumber
    const chainId = msgJson.data.chainId
    const hash = msgJson.data.hash
    const parentHash = msgJson.data.parentHash

    try {
      const insertedRows = await fetchAndSaveBlock(blockNumber, chainId, hash, parentHash)
      if (insertedRows === null) {
        logger.log('info', `BlockHandler: Skipped block ${blockNumber} on chain ${chainId}`, { message })
      }
      await message.ack()
      logger.log('debug', `BlockHandler: Acked block ${blockNumber} on chain ${chainId}`, { message })
    } catch (e) {
      logger.error(`BlockHandler:error`, { e, blockNumber, chainId, hash, parentHash })
      message.nack()
    }
  }

  newBlockSub.on('message', handleMessage)
}

startAsync()
