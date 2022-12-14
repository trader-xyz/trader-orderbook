/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common'

export interface TraitRouterInterface extends utils.Interface {
  functions: {
    'onERC721Received(address,address,uint256,bytes)': FunctionFragment
    'traitValidator()': FunctionFragment
    'zeroExV4()': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'onERC721Received' | 'traitValidator' | 'zeroExV4'): FunctionFragment

  encodeFunctionData(
    functionFragment: 'onERC721Received',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(functionFragment: 'traitValidator', values?: undefined): string
  encodeFunctionData(functionFragment: 'zeroExV4', values?: undefined): string

  decodeFunctionResult(functionFragment: 'onERC721Received', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'traitValidator', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'zeroExV4', data: BytesLike): Result

  events: {}
}

export interface TraitRouter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: TraitRouterInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    onERC721Received(
      arg0: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    traitValidator(overrides?: CallOverrides): Promise<[string]>

    zeroExV4(overrides?: CallOverrides): Promise<[string]>
  }

  onERC721Received(
    arg0: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  traitValidator(overrides?: CallOverrides): Promise<string>

  zeroExV4(overrides?: CallOverrides): Promise<string>

  callStatic: {
    onERC721Received(
      arg0: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>

    traitValidator(overrides?: CallOverrides): Promise<string>

    zeroExV4(overrides?: CallOverrides): Promise<string>
  }

  filters: {}

  estimateGas: {
    onERC721Received(
      arg0: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    traitValidator(overrides?: CallOverrides): Promise<BigNumber>

    zeroExV4(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    onERC721Received(
      arg0: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    traitValidator(overrides?: CallOverrides): Promise<PopulatedTransaction>

    zeroExV4(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
