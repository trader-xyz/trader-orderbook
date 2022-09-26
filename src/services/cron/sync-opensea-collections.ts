import createFetch from '@vercel/fetch'
import { getPrismaClient } from '../../prisma-client'
import { sleep } from '../utils/sleep'

import * as Sentry from '@sentry/node'
import cron from 'node-cron'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import {
  CHAIN_IDS,
  DEFAULT_OPENSEA_API_KEY,
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
} from '../../default-config'
import { JOBS } from '../utils/jobs'
import { OpenSeaCollectionData } from '../utils/opensea'

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? DEFAULT_SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const logger = getLoggerForService(ServiceNamesLogLabel['cron:sync-opensea-recent-collections'])

const fetch = createFetch()

const collectionsUrl = (offset: number) => `https://api.opensea.io/api/v1/collections?offset=${offset}&limit=300`

interface ResponseThing {
  collections: OpenSeaCollectionData[]
}

const prisma = getPrismaClient()

const MAX_LIMIT = 300
const SLEEP_OFFSET_IN_MS = 500
const MAX_OFFSET_ON_OPENSEA = 50000
const MAX_INSERT_MISSES = 3
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY

const doOpenSeaCollectionSync = async () => {
  let offset = 0
  let insertMisses = 0

  let insertCount = 0

  while (offset <= MAX_OFFSET_ON_OPENSEA) {
    console.log(`Looking up offset ${offset}`)

    const collectionsResult: ResponseThing = await fetch(collectionsUrl(offset), {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY!,
        Accept: 'application/json',
      },
    }).then((x) => x.json())

    const collections = collectionsResult.collections

    console.log(`Offset: ${offset} - Found ${collections.length}`)

    const collectionsWithTimestamp = collections.map((c) => {
      delete (c as any).default_to_fiat
      return {
        ...c,
        created_date: new Date(c.created_date),
      }
    })

    console.log(`Offset: ${offset} - Inserting ${collections.length} columns`)

    const dbRes = await prisma.opensea_collection_metadata_by_slug_v1.createMany({
      data: [...collectionsWithTimestamp] as any,
      skipDuplicates: true,
    })

    console.log(`Offset: ${offset} - Inserted ${dbRes.count} columns`)

    insertCount += dbRes.count

    if (dbRes.count === 0) {
      insertMisses += 1
    } else {
      insertMisses = 0
    }

    offset += MAX_LIMIT

    sleep(SLEEP_OFFSET_IN_MS)

    if (insertMisses >= MAX_INSERT_MISSES) {
      logger.silly(`doOpenSeaCollectionSync: No more new collections detected.`, { insertCount, insertMisses, offset })
      return insertCount
    }
  }

  return insertCount
}

const jobsToMonitorGaps = [[JOBS.OpenSeaRecentCollectionsSync, CHAIN_IDS.MAINNET]]

const CRON_FREQUENCY_IN_MINUTES = 10
const cronTasks = jobsToMonitorGaps.map(([jobName, chainId]) => {
  // ('*/30 * * * *') <-- cron for every 30 min
  /**
   * Run every 10 minutes
   */
  const cronTask = cron.schedule(`*/${CRON_FREQUENCY_IN_MINUTES} * * * *`, async (now) => {
    logger.info(`Running ${jobName} job (chain ${chainId})`, { jobName, now })
    const insertedRows = await doOpenSeaCollectionSync()
    logger.info(`Job ${jobName} completed successfully. ${insertedRows} new Collections found/inserted.`, {
      jobName,
      now,
      insertedRows,
    })
  })

  logger.info(`Initialized ${jobName} cron job`, { jobName })
  return cronTask
})

logger.info(
  `Started ${JOBS.OpenSeaRecentCollectionsSync} Cron job for ${cronTasks.length} jobs). Will run every ${CRON_FREQUENCY_IN_MINUTES} minutes for each job`,
  { jobsToMonitorGaps }
)
