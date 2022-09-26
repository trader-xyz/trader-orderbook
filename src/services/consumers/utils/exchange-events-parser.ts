import { Log, StaticJsonRpcProvider } from '@ethersproject/providers'
import type { LogDescription } from 'ethers/lib/utils'
import { IZeroEx__factory } from '../../../contracts'
import {
  ERC1155OrderCancelledEvent,
  ERC1155OrderFilledEvent,
  ERC721OrderCancelledEvent,
  ERC721OrderFilledEvent,
} from '../../../contracts/IZeroEx'

export const getOrderStatusLogsForBlocks = async (
  rpcUrl: string,
  zeroExContractAddress: string,
  _chainId: string,
  fromBlock: number,
  toBlock: number = fromBlock
) => {
  const wsProvider = new StaticJsonRpcProvider(rpcUrl)

  const zeroExContract = IZeroEx__factory.connect(zeroExContractAddress, wsProvider)

  const erc721FilledEvent =
    zeroExContract.interface.events[
      'ERC721OrderFilled(uint8,address,address,uint256,address,uint256,address,uint256,address)'
    ]
  const erc1155FilledEvent =
    zeroExContract.interface.events[
      'ERC1155OrderFilled(uint8,address,address,uint256,address,uint256,address,uint256,uint128,address)'
    ]
  const erc721CancelledEvent = zeroExContract.interface.events['ERC721OrderCancelled(address,uint256)']
  const erc1155CancelledEvent = zeroExContract.interface.events['ERC1155OrderCancelled(address,uint256)']

  const zeroExNftOrderTopics = [
    zeroExContract.interface.getEventTopic(erc721FilledEvent),
    zeroExContract.interface.getEventTopic(erc1155FilledEvent),
    zeroExContract.interface.getEventTopic(erc721CancelledEvent),
    zeroExContract.interface.getEventTopic(erc1155CancelledEvent),
  ]

  const pulledLogs = await wsProvider.getLogs({
    fromBlock: fromBlock,
    toBlock: toBlock,
    address: zeroExContractAddress,
    // nested arr to OR (otherwise its an AND if you flatten -- https://docs.ethers.io/v5/concepts/events/)
    topics: [zeroExNftOrderTopics],
  })

  const parsedLogsTuple: Array<readonly [LogDescription, Log]> = pulledLogs.map((originalLog) => {
    const parsedLogDescription = zeroExContract.interface.parseLog(originalLog)
    return [parsedLogDescription, originalLog] as const
  })

  const parsedEvents: Array<CancelEventPayload | FillEventPayload> = parsedLogsTuple.map(([parsedLog, originalLog]) => {
    const logName = parsedLog.name
    // const args = parsedLog.args
    const signature = parsedLog.signature
    const topic = parsedLog.topic

    const blockNumber = originalLog.blockNumber
    const blockHash = originalLog.blockHash
    const address = originalLog.address.toLowerCase()
    const data = originalLog.data
    const transactionHash = originalLog.transactionHash

    const common: EventCommon = {
      blockNumber,
      blockHash,
      address,
      data,
      transactionHash,
      signature,
      topic,
    }

    switch (logName) {
      case erc721FilledEvent.name:
        // KLUDGE(johnrjj) - Kinda sorta the right types, the 'args' property is correct but some of the other fields aren't.
        const erc721FilledLog = parsedLog as unknown as ERC721OrderFilledEvent
        const parseErc721FillEventArgs: FillEventParsedArgs = parseFillEvent(erc721FilledLog)
        const erc721FillEventPayload: Erc721FillEventPayload = {
          ...common,
          name: 'ERC721OrderFilled',
          eventType: 'fill',
          parsedData: parseErc721FillEventArgs,
        }
        return erc721FillEventPayload
      case erc1155FilledEvent.name:
        const erc1155FilledLog = parsedLog as unknown as ERC1155OrderFilledEvent
        const parseErc1155FillEventArgs: FillEventParsedArgs = parseFillEvent(erc1155FilledLog)
        const erc1155FillEventPayload: Erc1155FillEventPayload = {
          ...common,
          name: 'ERC1155OrderFilled',
          eventType: 'fill',
          parsedData: parseErc1155FillEventArgs,
        }
        return erc1155FillEventPayload
      case erc721CancelledEvent.name:
        const erc721CancelledLog = parsedLog as unknown as ERC721OrderCancelledEvent
        const parseErc721CancelEventArgs: CancelEventParsedArgs = parseCancelEvent(erc721CancelledLog)
        const erc721CancelEvent: Erc721CancelEventPayload = {
          ...common,
          name: 'ERC721OrderCancelled',
          eventType: 'cancel',
          parsedData: parseErc721CancelEventArgs,
        }
        return erc721CancelEvent
      case erc1155CancelledEvent.name:
        const erc1155CancelledLog = parsedLog as unknown as ERC1155OrderCancelledEvent
        const parseErc1155CancelEventArgs: CancelEventParsedArgs = parseCancelEvent(erc1155CancelledLog)
        const erc1155CancelEvent: Erc1155CancelEventPayload = {
          ...common,
          name: 'ERC1155OrderCancelled',
          eventType: 'cancel',
          parsedData: parseErc1155CancelEventArgs,
        }
        return erc1155CancelEvent
      default:
        throw new Error(`Unknown log name ${logName}`)
    }
  })

  return parsedEvents
}

export interface FillEventParsedArgs {
  direction: string
  erc20Token: string
  erc20TokenAmount: string
  nftToken: string
  nftTokenId: string
  nftTokenAmount: string
  maker: string
  taker: string
  nonce: string
  matcher: string
}

export interface CancelEventParsedArgs {
  maker: string
  nonce: string
}

export interface EventCommon {
  blockNumber: number
  blockHash: string
  address: string
  data: string
  transactionHash: string
  signature: string
  topic: string
}

export interface Erc721FillEventPayload extends EventCommon {
  name: 'ERC721OrderFilled'
  eventType: 'fill'
  parsedData: FillEventParsedArgs
}

export interface Erc1155FillEventPayload extends EventCommon {
  name: 'ERC1155OrderFilled'
  eventType: 'fill'
  parsedData: FillEventParsedArgs
}

export interface Erc721CancelEventPayload extends EventCommon {
  name: 'ERC721OrderCancelled'
  eventType: 'cancel'
  parsedData: CancelEventParsedArgs
}

export interface Erc1155CancelEventPayload extends EventCommon {
  name: 'ERC1155OrderCancelled'
  eventType: 'cancel'
  parsedData: CancelEventParsedArgs
}

export type FillEventPayload = Erc721FillEventPayload | Erc1155FillEventPayload

export type CancelEventPayload = Erc721CancelEventPayload | Erc1155CancelEventPayload

const parseCancelEvent = (e: ERC721OrderCancelledEvent | ERC1155OrderCancelledEvent): CancelEventParsedArgs => {
  // KLUDGE(johnrjj) -- need to get this type safe
  switch ((e as any).name) {
    case 'ERC721OrderCancelled':
      const erc721CancelEvent = e as ERC721OrderCancelledEvent
      const erc721CancelLogArgs = erc721CancelEvent.args
      const erc721ParsedArgs: CancelEventParsedArgs = {
        maker: erc721CancelLogArgs.maker,
        nonce: erc721CancelLogArgs.nonce.toString(), // NOTE(johnrjj) - There's a footgun here if nonces come in the form of hex numbers
      }
      return erc721ParsedArgs
    case 'ERC1155OrderCancelled':
      const erc1155CancelEvent = e as ERC721OrderCancelledEvent
      const erc1155CancelLogArgs = erc1155CancelEvent.args
      const erc1155ParsedArgs: CancelEventParsedArgs = {
        maker: erc1155CancelLogArgs.maker,
        nonce: erc1155CancelLogArgs.nonce.toString(),
      }
      return erc1155ParsedArgs
    default:
      throw new Error(`unknown cancel order event ${(e as any).name ?? e.event}`)
  }
}

const parseFillEvent = (e: ERC721OrderFilledEvent | ERC1155OrderFilledEvent): FillEventParsedArgs => {
  // KLUDGE(johnrjj) -- need to get this type safe
  switch ((e as any).name) {
    case 'ERC721OrderFilled':
      const erc721FillEvent = e as ERC721OrderFilledEvent
      const erc721FilledLogArgs = erc721FillEvent.args

      const erc721ParsedArgs: FillEventParsedArgs = {
        direction: erc721FilledLogArgs.direction.toString(),
        erc20Token: erc721FilledLogArgs.erc20Token,
        erc20TokenAmount: erc721FilledLogArgs.erc20TokenAmount.toString(),
        nftToken: erc721FilledLogArgs.erc721Token.toString(),
        nftTokenId: erc721FilledLogArgs.erc721TokenId.toString(),
        nftTokenAmount: '1',
        maker: erc721FilledLogArgs.maker,
        taker: erc721FilledLogArgs.taker,
        nonce: erc721FilledLogArgs.nonce.toString(),
        matcher: erc721FilledLogArgs.matcher,
      }
      return erc721ParsedArgs
    case 'ERC1155OrderFilled':
      const erc1155FillEvent = e as ERC1155OrderFilledEvent
      const erc1155FilledLogArgs = erc1155FillEvent.args
      const erc1155ParsedArgs: FillEventParsedArgs = {
        direction: erc1155FilledLogArgs.direction.toString(),
        erc20Token: erc1155FilledLogArgs.erc20Token,
        erc20TokenAmount: erc1155FilledLogArgs.erc20FillAmount.toString(),
        nftToken: erc1155FilledLogArgs.erc1155Token.toString(),
        nftTokenId: erc1155FilledLogArgs.erc1155TokenId.toString(),
        nftTokenAmount: erc1155FilledLogArgs.erc1155FillAmount.toString(),
        maker: erc1155FilledLogArgs.maker,
        taker: erc1155FilledLogArgs.taker,
        nonce: erc1155FilledLogArgs.nonce.toString(),
        matcher: erc1155FilledLogArgs.matcher,
      }
      return erc1155ParsedArgs
    default:
      throw new Error(`unknown fill event ${(e as any).name ?? e.event}`)
  }
}
