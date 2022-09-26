import * as Sentry from '@sentry/node'
import cron from 'node-cron'
import { Prisma, PrismaClient } from '@prisma/client'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { getPrismaClient } from '../../prisma-client'
import { CHAIN_IDS, DEFAULT_SENTRY_DSN, DEFAULT_SENTRY_SAMPLE_RATE } from '../../default-config'
import { JOBS } from '../utils/jobs'

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? DEFAULT_SENTRY_DSN,
  tracesSampleRate: DEFAULT_SENTRY_SAMPLE_RATE,
})

const logger = getLoggerForService(ServiceNamesLogLabel['producer:fix-block-gaps-by-job'])

// https://stackoverflow.com/questions/4340793/how-to-find-gaps-in-sequential-numbering-in-mysql/29736658#29736658
const fetchBlockGapsByJobName = async (jobName: string, chainId: string, prisma: PrismaClient) => {
  if (!jobName) {
    throw new Error('jobName canot be null')
  }
  if (!chainId) {
    throw new Error('chainId canot be null')
  }
  const gaps = await prisma.$queryRaw<Array<{ gapStart: number; gapEnd: number }>>`
    select
      a .block_number + 1 gapStart,
      (
          select
              x.block_number -1
          from
              job_records x
          where
              x.block_number > a .block_number + 1
              AND a .job_name = '${Prisma.sql([jobName])}'
              AND a .chain_id = '${Prisma.sql([chainId.toString()])}'
          limit
              1
      ) gapEnd
    from
      job_records a
      left join job_records b on b.block_number = a .block_number + 1
    where
      b.block_number is null
      AND a .job_name = '${Prisma.sql([jobName])}'
      AND a .chain_id = '${Prisma.sql([chainId.toString()])}'

    order by
      gapStart;
    `
  return gaps ?? []
}

const jobsToMonitorGaps = [[JOBS.OrderUpdateByBlock, CHAIN_IDS.ROPSTEN]]

const cronTasks = jobsToMonitorGaps.map(([jobName, chainId]) => {
  // ('*/30 * * * *') <-- cron for every 30 min
  /**
   * Run every 30 minutes
   */
  const cronTask = cron.schedule('*/1 * * * *', async (now) => {
    const prisma = getPrismaClient()

    const jobName = JOBS.OrderUpdateByBlock

    logger.info(`Running fix block gap cron job for job ${jobName}`, { jobName, now })

    const blockGapsForJob = await fetchBlockGapsByJobName(jobName, chainId, prisma)

    console.log('blockGaps', blockGapsForJob)
    logger.info(`${blockGapsForJob.length} block gaps detected for job ${jobName}`, { jobName, now })

    return
  })
  logger.info(`Initialized FixBlockGapsByJob cron service for job ${jobName}`)
  return cronTask
})

logger.info(
  `Started FixBlockGapsByJob Cron Service for ${cronTasks.length} jobs. Will run every 30 minutes for each job`,
  { jobsToMonitorGaps }
)

/**
 * 
 * 
 * Other solutions:
 * 
 * -- SELECT (t1.block_number + 1) as gap_starts_at,
--        (SELECT MIN(t3.block_number) -1 FROM job_records t3 WHERE t3.block_number > t1.block_number) as gap_ends_at
-- FROM job_records t1
-- WHERE NOT EXISTS (SELECT t2.block_number FROM job_records t2 WHERE t2.block_number = t1.block_number + 1)
-- HAVING gap_ends_at IS NOT NULL

// fastest below:
SELECT
    CONCAT(
        z.expected,
        IF(z.got -1 > z.expected, CONCAT(' thru ', z.got -1), '')
    ) AS missing
FROM
    (
        SELECT
            @rownum: = @rownum + 1 AS expected,
            IF(@rownum = block_number, 0, @rownum: = block_number) AS got
        FROM
            (
                SELECT
                    @rownum: = (
                        SELECT
                            MIN(block_number) -1
                        FROM
                            job_records
                    )
            ) AS a
            JOIN job_records
        ORDER BY
            block_number
    ) AS z
WHERE
    z.got ! = 0;
 * 
 * 
 */
