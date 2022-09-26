import { $fetch } from 'ohmyfetch'
import { NftSwapV4, SwappableAsset } from '@traderxyz/nft-swap-sdk'
import { ethers } from 'ethers'

const MAKER_WALLET_ADDRESS = '0xabc23F70Df4F45dD3Df4EC6DA6827CB05853eC9b'
const MAKER_PRIVATE_KEY = 'fc5db508b0a52da8fbcac3ab698088715595f8de9cccf2467d51952eec564ec9'
// NOTE(johnrjj) - NEVER use these private keys for anything of value, testnets only!

const WETH_TOKEN_ADDRESS_TESTNET = '0xc778417e063141139fce010982780140aa0cd5ab'
const DAI_TOKEN_ADDRESS_TESTNET = '0x31f42841c2db5173425b5223809cf3a38fede360'
const TEST_NFT_CONTRACT_ADDRESS = '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b' // https://ropsten.etherscan.io/token/0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b?a=0xabc23F70Df4F45dD3Df4EC6DA6827CB05853eC9b

const RPC_TESTNET = 'https://eth-ropsten.alchemyapi.io/v2/is1WqyAFM1nNFFx2aCozhTep7IxHVNGo'

const ROPSTEN_CHAIN_ID = 3

const MAKER_WALLET = new ethers.Wallet(MAKER_PRIVATE_KEY)
// const TAKER_WALLET = new ethers.Wallet(TAKER_PRIVATE_KEY);

const PROVIDER = new ethers.providers.StaticJsonRpcProvider(RPC_TESTNET)

const MAKER_SIGNER = MAKER_WALLET.connect(PROVIDER)

const nftSwap = new NftSwapV4(MAKER_SIGNER as any, MAKER_SIGNER, ROPSTEN_CHAIN_ID)

const NFT_ASSET: SwappableAsset = {
  type: 'ERC721',
  tokenAddress: TEST_NFT_CONTRACT_ADDRESS,
  tokenId: '11045',
}

const ERC20_ASSET: SwappableAsset = {
  type: 'ERC20',
  tokenAddress: DAI_TOKEN_ADDRESS_TESTNET,
  amount: '420000000000000', // 1 USDC
}

const doThing = async () => {
  // const offers = await nftSwap.getOrders({
  //   nftToken: '0x64CeE6c2beFeB3077F97b74c7027B7247d42e563',
  //   nftTokenId: '1',
  //   // sellOrBuyNft: "buy",
  // })

  // console.log('offers', offers)

  try {
    const order = nftSwap.buildOrder(NFT_ASSET, ERC20_ASSET, MAKER_WALLET_ADDRESS)

    const invalidOrder = nftSwap.buildOrder(
      { ...NFT_ASSET, tokenAddress: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5' },
      ERC20_ASSET,
      MAKER_WALLET_ADDRESS
    )

    const signedOrder = await nftSwap.signOrder(order)

    // delete (signedOrder as any).expiry

    const localEndpoint = 'http://localhost:5000/orderbook/order'
    const prodEndpoint = 'https://api.trader.xyz/orderbook/order'
    //   const endpoint = ''
    const postOrderResult = await $fetch(localEndpoint, {
      method: 'POST',
      body: { order: signedOrder, chainId: ROPSTEN_CHAIN_ID.toString(), metadata: { keykeyyee: '12341234' } },
    })
    console.log('posted order', postOrderResult)
  } catch (e: any) {
    console.log('error creating order')
    console.log(e)
    console.log(e.data)
    throw e
  }
}

doThing().catch((e) => console.log('error with script', e))
