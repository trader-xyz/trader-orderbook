// const foo = createAlchemyWeb3('', { maxRetries: 10 })

import { CHAIN_IDS } from '../default-config'
import { fetchCollection, fetchNftsForWallet, getNftMetadataOnAnyChain } from '../services/utils/nfts'

// const doAsync = async () => {
//   // const nftsForUser = foo.alchemy.getNfts({ owner: '', contractAddresses: undefined /** or [array of contract addresses] */, pageKey: undefined}, )

//   // const nftMetadataForToken = foo.alchemy.getNftMetadata({ contractAddress: '', tokenId: '', tokenType: 'erc721' })
//   const items = await getNftMetadataOnAnyChain('0x5763F564E0B5D8233Da0aCcf2585f2dbeF0f0dfa', '394', CHAIN_IDS.OPTIMISM)
//   // const items = await fetchNftsForWallet('0xC33881b8FD07d71098b440fA8A3797886D831061')
//   // const items = await fetchCollection('0x61fce80d72363b731425c3a2a46a1a5fed9814b2')
//   console.log('items', items)
//   console.log('length', items)
// }

// doAsync()
