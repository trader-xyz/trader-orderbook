
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./nft-swap-sdk.cjs.production.min.js')
} else {
  module.exports = require('./nft-swap-sdk.cjs.development.js')
}
