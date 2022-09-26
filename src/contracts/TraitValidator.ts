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
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common'

export declare namespace Trustus {
  export type TrustusPacketStruct = {
    v: PromiseOrValue<BigNumberish>
    r: PromiseOrValue<BytesLike>
    s: PromiseOrValue<BytesLike>
    request: PromiseOrValue<BytesLike>
    deadline: PromiseOrValue<BigNumberish>
    payload: PromiseOrValue<BytesLike>
  }

  export type TrustusPacketStructOutput = [number, string, string, string, BigNumber, string] & {
    v: number
    r: string
    s: string
    request: string
    deadline: BigNumber
    payload: string
  }
}

export interface TraitValidatorInterface extends utils.Interface {
  functions: {
    'DOMAIN_SEPARATOR()': FunctionFragment
    'propertyDeadline(bytes32)': FunctionFragment
    'setProperty(bytes32,(uint8,bytes32,bytes32,bytes32,uint256,bytes))': FunctionFragment
    'validateProperty(address,uint256,bytes)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic: 'DOMAIN_SEPARATOR' | 'propertyDeadline' | 'setProperty' | 'validateProperty'
  ): FunctionFragment

  encodeFunctionData(functionFragment: 'DOMAIN_SEPARATOR', values?: undefined): string
  encodeFunctionData(functionFragment: 'propertyDeadline', values: [PromiseOrValue<BytesLike>]): string
  encodeFunctionData(
    functionFragment: 'setProperty',
    values: [PromiseOrValue<BytesLike>, Trustus.TrustusPacketStruct]
  ): string
  encodeFunctionData(
    functionFragment: 'validateProperty',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string

  decodeFunctionResult(functionFragment: 'DOMAIN_SEPARATOR', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'propertyDeadline', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setProperty', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'validateProperty', data: BytesLike): Result

  events: {
    'PropertySet(bytes32,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'PropertySet'): EventFragment
}

export interface PropertySetEventObject {
  request: string
  deadline: BigNumber
}
export type PropertySetEvent = TypedEvent<[string, BigNumber], PropertySetEventObject>

export type PropertySetEventFilter = TypedEventFilter<PropertySetEvent>

export interface TraitValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: TraitValidatorInterface

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
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>

    propertyDeadline(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>

    setProperty(
      request: PromiseOrValue<BytesLike>,
      packet: Trustus.TrustusPacketStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    validateProperty(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      propertyData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[void]>
  }

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>

  propertyDeadline(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>

  setProperty(
    request: PromiseOrValue<BytesLike>,
    packet: Trustus.TrustusPacketStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  validateProperty(
    tokenAddress: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    propertyData: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<void>

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>

    propertyDeadline(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>

    setProperty(
      request: PromiseOrValue<BytesLike>,
      packet: Trustus.TrustusPacketStruct,
      overrides?: CallOverrides
    ): Promise<void>

    validateProperty(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      propertyData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {
    'PropertySet(bytes32,uint256)'(request?: PromiseOrValue<BytesLike> | null, deadline?: null): PropertySetEventFilter
    PropertySet(request?: PromiseOrValue<BytesLike> | null, deadline?: null): PropertySetEventFilter
  }

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>

    propertyDeadline(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>

    setProperty(
      request: PromiseOrValue<BytesLike>,
      packet: Trustus.TrustusPacketStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    validateProperty(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      propertyData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>

    propertyDeadline(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    setProperty(
      request: PromiseOrValue<BytesLike>,
      packet: Trustus.TrustusPacketStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    validateProperty(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      propertyData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
