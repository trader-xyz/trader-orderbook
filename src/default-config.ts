import { addresses } from './addresses'

const DEFAULT_SENTRY_DSN = process.env.SENTRY_DSN
const DEFAULT_SENTRY_SAMPLE_RATE = 1.0

export const CHAIN_IDS = {
  MAINNET: '1',
  ROPSTEN: '3',
  RINKEBY: '4',
  POLYGON: '137',
  POLYGON_MUMBAI: '80001',
  ARBITRUM: '42161',
  OPTIMISM: '10',
  GOERLI: '5',
}

export const CHAIN_IDS_NAMES = {
  [CHAIN_IDS.MAINNET]: 'Mainnet',
  [CHAIN_IDS.ROPSTEN]: 'Ropsten',
  [CHAIN_IDS.POLYGON]: 'Polygon',
  [CHAIN_IDS.POLYGON_MUMBAI]: 'Polygon Mumbai Testnet',
  [CHAIN_IDS.ARBITRUM]: 'Arbitrum',
  [CHAIN_IDS.OPTIMISM]: 'Optimism',
  [CHAIN_IDS.GOERLI]: 'Goerli',
}

const WS_RPC = {
  // mainnet
  [CHAIN_IDS.MAINNET]: process.env.RPC_MAINNET,
  // ropsten
  [CHAIN_IDS.ROPSTEN]: process.env.RPC_ROPSTEN,
  // polygon
  [CHAIN_IDS.POLYGON]: process.env.RPC_POLYGON,
  // polygon mumbai
  [CHAIN_IDS.POLYGON_MUMBAI]: process.env.RPC_POLYGON_MUMBAI,
  // arbitrum
  [CHAIN_IDS.ARBITRUM]: process.env.RPC_MAINNET_ARBITRUM,
  // optimism
  [CHAIN_IDS.OPTIMISM]: process.env.RPC_OPTIMISM,
  // goerli
  [CHAIN_IDS.GOERLI]: process.env.RPC_GOERLI,
}

const JSON_RPC = {
  // mainnet
  [CHAIN_IDS.MAINNET]: process.env.RPC_MAINNET,
  // ropsten
  [CHAIN_IDS.ROPSTEN]: process.env.RPC_ROPSTEN,
  // polygon
  [CHAIN_IDS.POLYGON]: process.env.RPC_POLYGON,
  // polygon mumbai
  [CHAIN_IDS.POLYGON_MUMBAI]: process.env.RPC_POLYGON_MUMBAI,
  // arbitrum
  [CHAIN_IDS.ARBITRUM]: process.env.RPC_MAINNET_ARBITRUM,
  // optimism
  [CHAIN_IDS.OPTIMISM]: process.env.RPC_OPTIMISM,
  // goerli
  [CHAIN_IDS.GOERLI]: process.env.RPC_GOERLI,
}

const getZeroExContract = (chainId: string): string => {
  const addressesForChain = addresses[chainId]
  if (!addressesForChain) {
    throw new Error(`Unknown addresses for chain ${chainId} (chain not supported)`)
  }
  const zeroExContractAddress = addressesForChain.exchange
  return zeroExContractAddress
}

const getWsRpcUrlByChainId = (chainId: string) => {
  const wsRpc = WS_RPC[chainId.trim().toString()]
  if (!wsRpc) {
    throw new Error(`Unknown WS RPC URL for chain ${chainId} (chain not supported)`)
  }
  return wsRpc
}

const getJsonRpcUrlByChainId = (chainId: string) => {
  const jsonRpc = JSON_RPC[chainId.trim().toString()]
  if (!jsonRpc) {
    throw new Error(`Unknown Json RPC URL for chain ${chainId} (chain not supported)`)
  }
  return jsonRpc
}

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID ?? 'traderxyz'

const DEFAULT_OPENSEA_API_KEY = process.env.OPENSEA_API_KEY
const DEFAULT_COVALENT_API_KEY = process.env.COVALENT_API_KEY

export {
  DEFAULT_SENTRY_DSN,
  DEFAULT_SENTRY_SAMPLE_RATE,
  GCP_PROJECT_ID,
  DEFAULT_OPENSEA_API_KEY,
  DEFAULT_COVALENT_API_KEY,
  getWsRpcUrlByChainId,
  getZeroExContract,
  getJsonRpcUrlByChainId,
  WS_RPC,
  JSON_RPC,
}
