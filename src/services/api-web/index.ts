require('dotenv').config()

import { bootstrapApp } from './app'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'

const PORT = parseInt(process.env.PORT || '5000', 10)
const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

bootstrapApp().then((app) => {
  app.listen(PORT, () => {
    logger.info(
      `🚀 Trader.xyz Orderbook API service instance started. Listening on port ${PORT} ( http://localhost:${PORT}/healthcheck ) 🚀`
    )
  })
})
