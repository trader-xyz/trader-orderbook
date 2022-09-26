console.log('App bootstrapping...')
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import { express as expressLogging } from '@google-cloud/logging-winston'
import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { createOrderbookRouter } from '../../api/orderbook'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { createNftMetadataRequestRouter } from '../../api/nft-metadata'
// import { getRedisClient } from '../../redis-client'

const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

const bootstrapApp = async () => {
  const isProduction = process.env.NODE_ENV === 'production'
  logger.debug('Initializing API web service express app...', { isProduction })

  // Express
  const app = express()

  // const redisClient = getRedisClient()

  if (isProduction) {
    Sentry.init({
      dsn: process.SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler())
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler())
  }

  // // Create and use the rate limiter
  // const readOnlyRateLimiter = rateLimit({
  //   // Rate limiter configuration
  //   windowMs: 1 * 60 * 1000, // 1 minute
  //   max: async (_request, _response) => {
  //     return 600
  //   },
  //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  //   // Redis store configuration
  //   store: new RedisStore({
  //     prefix: 'rl-orderbook-view',
  //     sendCommand: (...args: string[]) => (redisClient as any).call(...args),
  //   }),
  // })

  // // Create and use the rate limiter
  // const readWriteRateLimiter = rateLimit({
  //   // Rate limiter configuration
  //   windowMs: 1 * 60 * 1000, // 1 minute
  //   // Limit each IP to 100 requests per `window`
  //   max: async (_request, _response) => {
  //     return 60
  //   },
  //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  //   // Redis store configuration
  //   store: new RedisStore({
  //     prefix: 'rl-orderbook-write',
  //     sendCommand: (...args: string[]) => (redisClient as any).call(...args),
  //   }),
  // })

  const logMiddleware = await expressLogging.makeMiddleware(logger)

  app.use(logMiddleware)

  app.use(helmet())
  app.enable('trust proxy')
  app.use(compression())
  app.use(express.json())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Set up routes and middlewares
  // Basic Healthchecks
  app.get('/', (_, res) => res.sendStatus(200))
  app.get('/healthcheck', (_, res) => res.sendStatus(200))
  app.get('/status', (_, res) => res.sendStatus(200))

  app.use('/orderbook', createOrderbookRouter())
  app.use('/nft/metadata', createNftMetadataRequestRouter())

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler())

  // Error middlewares
  app.use((_req, _res, next) => {
    const err = new Error('Not Found') as any
    err.status = 404
    next(err)
  })

  app.use((error, _req, res, _next) => {
    res.status(error.status || 500)
    res.json({ ...error })
  })

  // Config done! Ready to go.
  logger.log('debug', 'App configured.')

  return app
}

export { bootstrapApp }
