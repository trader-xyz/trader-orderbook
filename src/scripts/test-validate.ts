import { AlchemyProvider, JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { getJsonRpcUrlByChainId } from '../default-config'

const chainId = '1'
const alchemyRpc = new StaticJsonRpcProvider(getJsonRpcUrlByChainId(chainId), parseInt(chainId))

const foo = new NftSwapV4(alchemyRpc as any, alchemyRpc as any, 1)

const doAsync = async () => {
  const orders = await foo.getOrders({
    nftToken: '0x5af0d9827e0c53e4799bb226655a1de152a425a5'.toLowerCase(),
  })

  // console.log(orders);

  const order = orders.orders[0]

  // console.log('order', order);

  const isValidSig = await foo.validateSignature(order.order)

  const fillableStatus = await foo.checkOrderCanBeFilledMakerSide(order.order)

  const orderStatus = await foo.getOrderStatus(order.order)

  console.log('isValidSig', isValidSig)
  console.log('fillableStatus', fillableStatus)
  console.log('orderStatus', orderStatus)
}

doAsync()
