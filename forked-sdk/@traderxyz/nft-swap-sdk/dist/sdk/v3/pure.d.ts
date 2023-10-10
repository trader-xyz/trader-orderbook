import type { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider, Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import type { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { ExchangeContract } from '../../contracts';
import { AdditionalOrderConfig, Order, OrderInfoV3, OrderStatusV3, SerializedAvailableAssetDataTypesDecoded, SignedOrder, SigningOptionsV3, SwappableAsset, UserFacingSerializedSingleAssetDataTypes } from './types';
import type { ApprovalStatus, PayableOverrides, TransactionOverrides } from '../common/types';
export declare const cancelOrder: (exchangeContract: ExchangeContract, order: Order) => Promise<ContractTransaction>;
export declare const getOrderInfo: (exchangeContract: ExchangeContract, order: Order) => Promise<OrderInfoV3>;
export declare const getOrderStatus: (exchangeContract: ExchangeContract, order: Order) => Promise<OrderStatusV3>;
export declare const cancelOrders: (exchangeContract: ExchangeContract, orders: Array<Order>, overrides?: PayableOverrides | undefined) => Promise<ContractTransaction>;
export declare const cancelOrdersUpToNow: (exchangeContract: ExchangeContract, unixTimestampAsSalt?: string) => void;
export declare const hashOrder: (order: Order, chainId: number, exchangeContractAddress: string) => string;
export declare type InterallySupportedAssetFormat = UserFacingSerializedSingleAssetDataTypes;
export declare const signOrderWithEip1271: (order: Order, signer: Signer, chainId: number, exchangeContractAddress: string) => Promise<string>;
export declare const signOrderWithEoaWallet: (order: Order, signer: TypedDataSigner, chainId: number, exchangeContractAddress: string) => Promise<string>;
export declare const checkIfContractWallet: (provider: Provider, walletAddress: string) => Promise<boolean>;
export declare const signOrder: (order: Order, signerAddress: string, signer: Signer, provider: Provider, chainId: number, exchangeContractAddress: string, signingOptions?: Partial<SigningOptionsV3> | undefined) => Promise<SignedOrder>;
export declare const prepareOrderSignatureFromEoaWallet: (rawSignature: string) => string;
export declare const prepareOrderSignatureFromContractWallet: (rawSignature: string) => string;
export declare const verifyOrderSignature: (order: Order, signature: string, chainId: number, exchangeContractAddress: string) => boolean;
export declare const buildOrder: (makerAssets: Array<InterallySupportedAssetFormat>, takerAssets: Array<InterallySupportedAssetFormat>, orderConfig: AdditionalOrderConfig) => Order;
export declare const fillSignedOrder: (signedOrder: SignedOrder, exchangeContract: ExchangeContract, overrides?: PayableOverrides | undefined) => Promise<ContractTransaction>;
/**
 *
 * @param walletAddress Owner of the asset
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param provider
 * @returns
 */
export declare const getApprovalStatus: (walletAddress: string, exchangeProxyAddressForAsset: string, asset: InterallySupportedAssetFormat, provider: BaseProvider) => Promise<ApprovalStatus>;
export declare const MAX_APPROVAL: BigNumber;
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */
export declare const approveAsset: (exchangeProxyAddressForAsset: string, asset: InterallySupportedAssetFormat, signer: Signer, overrides?: TransactionOverrides, approve?: boolean) => Promise<ContractTransaction>;
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */
export declare const estimateGasForApproval: (exchangeProxyAddressForAsset: string, asset: InterallySupportedAssetFormat, signer: Signer, overrides?: TransactionOverrides, approve?: boolean) => Promise<BigNumber>;
export declare const getSignatureTypeFromSignature: (signature: string) => string;
export declare const estimateGasForFillOrder: (signedOrder: SignedOrder, exchangeContract: ExchangeContract, _overrides?: PayableOverrides | undefined) => Promise<BigNumber>;
export declare const convertDecodedAssetDataToUserFacingAssets: (decodedAssetData: SerializedAvailableAssetDataTypesDecoded, assetAmount: string) => Array<SwappableAsset>;
export declare const getAssetsFromOrder: (order: Order) => {
    makerAssets: SwappableAsset[];
    takerAssets: SwappableAsset[];
};
