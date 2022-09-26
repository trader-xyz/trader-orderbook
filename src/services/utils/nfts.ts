import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import queryString from 'query-string'
import { Agent } from '@zoralabs/nft-metadata'
import createFetch from '@vercel/fetch'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { getJsonRpcUrlByChainId, DEFAULT_OPENSEA_API_KEY } from '../../default-config'
import { ERC721__factory } from '../../contracts'

interface CanonicalNftWithMetadata {
  tokenId: string
  tokenAddress: string
  metadata: any
  tokenURI: string
  tokenURL?: string
  tokenURLMimeType?: string
  name?: string
  description?: string
  contentURL?: string
  contentURLMimeType?: string
  imageURL?: string
  imageURLMimeType?: string
  externalLink?: string
  attributes?: Record<string, any>[]
}

const fetch = createFetch()

interface NftMetadata {
  image?: string
  attributes?: Array<Record<string, any>>
}
interface TokenUri {
  raw: string
  gateway: string
}
interface NftMedia {
  uri?: TokenUri
}
interface NftContract {
  address: string
}
interface NftId {
  tokenId: string
  tokenMetadata?: NftTokenMetadata
}
interface NftTokenMetadata {
  tokenType: 'erc721' | 'erc1155'
}

export interface NftWithMetadata {
  contract: NftContract
  id: NftId
  title: string
  description: string
  tokenUri?: TokenUri
  media?: NftMedia[]
  metadata?: NftMetadata
  timeLastUpdated: string
}

export interface GetCollectionResponse {
  nfts: Array<NftWithMetadata>
  nextToken: string | undefined
}

export interface AccountNftsResponse {
  ownedNfts: Array<NftWithMetadata>
  totalCount: number
  blockHash: string
}

const fetchCollection = async (
  contractAdddress: string,
  chainId: string,
  startTokenId?: string
): Promise<GetCollectionResponse> => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  } as const

  // const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
  // const startTokenId = undefined //"0x1ea2";
  const withMetadata = 'true'

  const queryParams = queryString.stringify({
    contractAddress: contractAdddress,
    startToken: startTokenId,
    withMetadata: withMetadata,
  })

  const baseURL = getJsonRpcUrlByChainId(chainId)
  const fetchURL = `${baseURL}?${queryParams}`

  const collectionResponse: GetCollectionResponse = await fetch(fetchURL, requestOptions).then((response) =>
    response.json()
  )

  return collectionResponse
}

const fetchNftMetadataFromAlchemy = async (
  contractAddress: string,
  tokenId: string,
  chainId: string,
  tokenType?: 'erc721' | 'erc1155'
): Promise<NftWithMetadata> => {
  const alchemy = createAlchemyWeb3(getJsonRpcUrlByChainId(chainId))
  const alchemyNftMetadata = await alchemy.alchemy.getNftMetadata({ contractAddress, tokenId, tokenType })
  const nftMetadata = alchemyNftMetadata as NftWithMetadata // KLUDGE(johnrjj)
  return nftMetadata
}

const fetchNftsForWallet = async (
  owner: string,
  chainId: string,
  contractAddresssFilter?: string[] | undefined,
  pageKey?: string | undefined
) => {
  const alchemy = createAlchemyWeb3(getJsonRpcUrlByChainId(chainId))
  const nftsOwned = await alchemy.alchemy.getNfts({
    owner: owner,
    contractAddresses: contractAddresssFilter,
    pageKey,
    // filters: ['SPAM'],
    // filters: ['SPAM'],
  })
  // KLUDGE(johnrjj) - Returns wrong types when `withMetadata` is true (which it is by default)
  return nftsOwned
}

const fetchNftMetadataFromOpenSea = async (contractAddress: string, tokenId: string, _chainId: string) => {
  if (_chainId !== '1') {
    throw new Error('only mainnet')
  }
  const metadataResponseFromOpenSea = await fetch(
    `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/?include_orders=false`,
    {
      headers: {
        'X-API-KEY': DEFAULT_OPENSEA_API_KEY,
        Accept: 'application/json',
      },
    }
  ).then((x) => x.json())

  return metadataResponseFromOpenSea
}

interface NftWithMetadataZoraLibraryVersion {
  tokenId: string
  tokenAddress: string
  metadata: any
  tokenURI: string
  tokenURL: string
  tokenURLMimeType: string
  name?: string
  description?: string
  contentURL?: string
  contentURLMimeType?: string
  imageURL?: string
  imageURLMimeType?: string
  externalLink?: string
  attributes?: Record<string, any>[]
}

const getNftMetadataOnAnyChain = async (
  contractAddress: string,
  tokenId: string,
  chainId: string
): Promise<NftWithMetadataZoraLibraryVersion> => {
  const parser = new Agent({
    network: chainId,
    timeout: 30 * 1000,
    provider: new StaticJsonRpcProvider(getJsonRpcUrlByChainId(chainId), parseInt(chainId)),
  })

  const metadata: NftWithMetadataZoraLibraryVersion = await parser.fetchMetadata(contractAddress, tokenId)

  return metadata
}

const getNftMetadataForContractOnAnyChain = async (contractAddress: string, chainId: string) => {
  const provider = new StaticJsonRpcProvider(getJsonRpcUrlByChainId(chainId), parseInt(chainId))

  const erc721 = ERC721__factory.connect(contractAddress, provider)

  let name: string | undefined = undefined
  try {
    name = await erc721.name()
  } catch (e) {}

  return {
    name,
  }
}

export {
  fetchCollection,
  fetchNftMetadataFromAlchemy,
  fetchNftMetadataFromOpenSea,
  fetchNftsForWallet,
  getNftMetadataForContractOnAnyChain,
  getNftMetadataOnAnyChain,
}
