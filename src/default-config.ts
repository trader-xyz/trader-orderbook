import { addresses } from './addresses'

const DEFAULT_SENTRY_DSN = process.env.SENTRY_DSN
const DEFAULT_SENTRY_SAMPLE_RATE = 1.0

export const CHAIN_IDS = {
  GAUSS: '1777',
  GIL: '1452'
}

export const CHAIN_IDS_NAMES = {
  [CHAIN_IDS.GAUSS]: 'Gauss',
  [CHAIN_IDS.GIL]: 'GIL Testnet'
}

const WS_RPC = {
  // gauss
  [CHAIN_IDS.GAUSS]: process.env.RPC_GAUSS,
  // gil
  [CHAIN_IDS.GIL]: process.env.RPC_GIL,
}

const JSON_RPC = {
  // gauss
  [CHAIN_IDS.GAUSS]: process.env.RPC_GAUSS,
  // gil
  [CHAIN_IDS.GIL]: process.env.RPC_GIL,
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

const DEFAULT_OPENSEA_API_KEY = 'caa94620645e4f708d2db9503e876b21'
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
