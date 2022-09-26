import { Router } from 'express'
import { getLoggerForService, ServiceNamesLogLabel } from '../logger'
import { getPrismaClient } from '../prisma-client'
import { createApiError } from '../errors/api-error'
import { publishNftMetadataForNftRequest } from '../services/publishers/nft-metadata'
import {
  fetchNftMetadataFromAlchemy,
  fetchNftsForWallet,
  getNftMetadataForContractOnAnyChain,
  getNftMetadataOnAnyChain,
} from '../services/utils/nfts'
import { fetchOpenseaCollectionByContractAddress } from '../services/utils/opensea'
import { upsertOpenSeaCollectionScrapedData } from '../services/consumers/sync-opensea-collection-metadata-by-address'

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

const createNftMetadataRequestRouter = () => {
  const nftMetadataRouter = Router()

  nftMetadataRouter.get('/', (_, res) => res.sendStatus(200))
  nftMetadataRouter.get('/healthcheck', (_, res) => res.sendStatus(200))

  // Fetch collection metadata (from opensea (or cached opensea))
  nftMetadataRouter.get('/:chainId/:contractAddress', async (req, res, next) => {
    const sync = req.query.sync

    const chainId = req.params.chainId
    const contractAddress = req.params.contractAddress
    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
    }
    if (!contractAddress) {
      return res.status(400).json(createApiError('CONTRACT_ADDRESS_MISSING', 'contractAddress missing from GET'))
    }

    const maybeExistingOpenSeaContractMetadata =
      await prisma.opensea_collection_metadata_by_contract_address_v1.findFirst({
        where: {
          address: contractAddress.toLowerCase(),
        },
      })

    if (maybeExistingOpenSeaContractMetadata) {
      logger.info(`API:NFTCollectionMetadata: Found existing NFT collection metadata ${contractAddress}.`, {
        chainId,
        contractAddress,
      })
      return res.json({
        osData: maybeExistingOpenSeaContractMetadata,
        contractAddress,
        chainId,
      })
    }

    if (sync) {
      logger.info(
        `API:NFTCollectionMetadata: Syncing new NFT Collection metadata ${contractAddress}. Looking up metadata.`,
        { chainId, contractAddress }
      )
      try {
        const openseaCollectionByContractAddress = await fetchOpenseaCollectionByContractAddress(
          contractAddress,
          chainId
        )
        if (openseaCollectionByContractAddress === null) {
          logger.info(`API:NFTCollectionMetadata: 404 looking for asset`, {
            chainId,
            contractAddress,
            openseaCollectionByContractAddress,
          })
          return res.json({
            osDataError: 'Collection not found',
            osData: null,
            contractAddress,
            chainId,
          })
        }
        const upsertedRes = await upsertOpenSeaCollectionScrapedData(openseaCollectionByContractAddress)
        logger.info(
          `API:NFTCollectionMetadata: Inserted new NFT Collection metadata into db ${contractAddress}. Looking up metadata.`,
          { chainId, contractAddress, upsertedRes, openseaCollectionByContractAddress }
        )
        return res.json({
          osData: upsertedRes,
          contractAddress,
          chainId,
        })
      } catch (e) {
        logger.error(`API:NFTCollectionMetadata: Error!`, { chainId, contractAddress, e })
        return res.json({
          osDataError: 'Error syncing OpenSea data',
          osData: null,
          contractAddress,
          chainId,
        })
      }
    }

    return res.json({
      osData: null,
      contractAddress,
      chainId,
    })
  })

  // Get nfts for wallet
  nftMetadataRouter.get('/wallet/:walletAddress/:chainId/', async (req, res, next) => {
    const chainId = req.params.chainId
    const walletAddress = req.params.walletAddress

    const pageKey = req.query.pageKey?.toString()
    let maybeAllowlist: string[] | undefined = undefined
    if (req.query.allowlist) {
      if (Array.isArray(req.query.allowlist)) {
        maybeAllowlist = [...(req.query.allowlist as string[])]
      } else {
        maybeAllowlist = [req.query.allowlist as string]
      }
    }

    const sync = req.query.sync

    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
    }
    if (!walletAddress) {
      return res.status(400).json(createApiError('WALLET_ADDRESS_MISSING', 'walletAddress missing from GET'))
    }

    let parsedChainId: number | null = null
    try {
      parsedChainId = parseInt(chainId, 10)
    } catch (e) {
      return res.status(400).json(createApiError('INVALID_CHAIN_ID', 'Problem parsing chainId'))
    }
    try {
      const metadata = await fetchNftsForWallet(
        walletAddress,
        parsedChainId.toString(),
        maybeAllowlist,
        pageKey ?? undefined
      )
      return res.status(200).json(metadata)
    } catch (e: any) {
      console.log(e)
      return res.status(400).json({ error: e.error ?? e.message ?? e.code ?? e })
    }
  })

  // NFT metadata from alchemy
  nftMetadataRouter.get('/:chainId/:contractAddress/:tokenId/alchemy', async (req, res, next) => {
    const chainId = req.params.chainId
    const contractAddress = req.params.contractAddress
    const tokenId = req.params.tokenId

    const sync = req.query.sync

    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
    }
    if (!contractAddress) {
      return res.status(400).json(createApiError('CONTRACT_ADDRESS_MISSING', 'contractAddress missing from GET'))
    }
    if (!tokenId) {
      return res.status(400).json(createApiError('TOKEN_ID_MIDDING', 'tokenId missing from GET'))
    }

    let parsedChainId: number | null = null
    try {
      parsedChainId = parseInt(chainId, 10)
    } catch (e) {
      return res.status(400).json(createApiError('INVALID_CHAIN_ID', 'Problem parsing chainId'))
    }
    try {
      const metadata = await fetchNftMetadataFromAlchemy(contractAddress, tokenId, parsedChainId.toString())
      return res.status(200).json(metadata)
    } catch (e: any) {
      return res.status(400).json({ error: e.error ?? e.message ?? e.code ?? e })
    }
  })

  // Collection address on chain
  nftMetadataRouter.get('/:chainId/:contractAddress/onchain', async (req, res, next) => {
    const chainId = req.params.chainId
    const contractAddress = req.params.contractAddress

    const sync = req.query.sync

    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
    }
    if (!contractAddress) {
      return res.status(400).json(createApiError('CONTRACT_ADDRESS_MISSING', 'contractAddress missing from GET'))
    }

    let parsedChainId: number | null = null
    try {
      parsedChainId = parseInt(chainId, 10)
    } catch (e) {
      return res.status(400).json(createApiError('INVALID_CHAIN_ID', 'Problem parsing chainId'))
    }
    try {
      const metadata = await getNftMetadataForContractOnAnyChain(contractAddress, parsedChainId.toString())
      return res.status(200).json(metadata)
    } catch (e: any) {
      return res.status(400).json({ error: e.error ?? e.message ?? e.code ?? e })
    }
  })

  // nftMetadataRouter.get('/:chainId/:contractAddress/:tokenId/opensea', async (req, res, next) => {
  //   const chainId = req.params.chainId
  //   const contractAddress = req.params.contractAddress
  //   const tokenId = req.params.tokenId

  //   const sync = req.query.sync

  //   if (!chainId) {
  //     return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
  //   }
  //   if (!contractAddress) {
  //     return res.status(400).json(createApiError('CONTRACT_ADDRESS_MISSING', 'contractAddress missing from GET'))
  //   }
  //   if (!tokenId) {
  //     return res.status(400).json(createApiError('TOKEN_ID_MIDDING', 'tokenId missing from GET'))
  //   }

  //   let parsedChainId: number | null = null
  //   try {
  //     parsedChainId = parseInt(chainId, 10)
  //   } catch (e) {
  //     return res.status(400).json(createApiError('INVALID_CHAIN_ID', 'Problem parsing chainId'))
  //   }
  //   try {
  //     const metadata = await fetchNftMetadataFromAlchemy(contractAddress, tokenId, parsedChainId)
  //     return res.status(200).json(metadata)
  //   } catch (e) {
  //     return res.status(400).json({ error: e })
  //   }
  // })

  nftMetadataRouter.get('/:chainId/:contractAddress/:tokenId', async (req, res, next) => {
    const chainId = req.params.chainId
    const contractAddress = req.params.contractAddress
    const tokenId = req.params.tokenId

    const sync = req.query.sync

    if (!chainId) {
      return res.status(400).json(createApiError('CHAIN_ID_MISSING', 'chainId missing from GET'))
    }
    if (!contractAddress) {
      return res.status(400).json(createApiError('CONTRACT_ADDRESS_MISSING', 'contractAddress missing from GET'))
    }
    if (!tokenId) {
      return res.status(400).json(createApiError('TOKEN_ID_MIDDING', 'tokenId missing from GET'))
    }
    logger.info(`Publishing nft metadata request message`, { chainId, contractAddress, tokenId })

    if (sync?.toString() === 'true') {
      const nftMetadata = await getNftMetadataOnAnyChain(contractAddress, tokenId, chainId)
      return res.status(200).json({
        nftMetadata,
      })
    }

    const pubRequestMsgId = await publishNftMetadataForNftRequest(contractAddress, tokenId, chainId)
    return res.status(200).json({ id: pubRequestMsgId })
  })

  return nftMetadataRouter
}

export { createNftMetadataRequestRouter }
