import type { BaseProvider } from '@ethersproject/providers';
import type { Signer } from '@ethersproject/abstract-signer';
import type { ApprovalOverrides, BuildOrderAdditionalConfig, FillOrderOverrides, INftSwapV3 } from './INftSwapV3';
import { Order, OrderInfoV3, OrderStatusV3, SignedOrder, SwappableAsset, SigningOptionsV3 } from './types';
import { ExchangeContract } from '../../contracts';
import { PayableOverrides, TransactionOverrides } from '../common/types';
export interface NftSwapConfig {
    exchangeContractAddress?: string;
    erc20ProxyContractAddress?: string;
    erc721ProxyContractAddress?: string;
    erc1155ProxyContractAddress?: string;
    forwarderContractAddress?: string;
    wrappedNativeTokenContractAddress?: string;
    gasBufferMultiples?: {
        [chainId: number]: number;
    };
}
/**
 * NftSwap Convenience class to swap between ERC20, ERC721, and ERC1155. Primary entrypoint for swapping.
 */
declare class NftSwapV3 implements INftSwapV3 {
    provider: BaseProvider;
    signer: Signer | undefined;
    chainId: number;
    exchangeContract: ExchangeContract;
    exchangeContractAddress: string;
    erc20ProxyContractAddress: string;
    erc721ProxyContractAddress: string;
    erc1155ProxyContractAddress: string;
    wrappedNativeTokenContractAddress: string | null;
    forwarderContractAddress: string | null;
    gasBufferMultiples: {
        [chainId: number]: number;
    } | null;
    constructor(provider: BaseProvider, signer: Signer, chainId?: number, additionalConfig?: NftSwapConfig);
    cancelOrder: (order: Order) => Promise<import("ethers").ContractTransaction>;
    /**
     *
     * @param order : 0x Order;
     * @param timeoutInMs : Timeout in millisecond to give up listening for order fill
     * @param throwIfStatusOtherThanFillableOrFilled : Option to throw if status changes from fillable to anything other than 'filled' (e.g 'cancelled')
     * @returns OrderInfo if status change in order, or null if timed out
     */
    waitUntilOrderFilledOrCancelled: (order: Order, timeoutInMs?: number, pollOrderStatusFrequencyInMs?: number, throwIfStatusOtherThanFillableOrFilled?: boolean) => Promise<OrderInfoV3 | null>;
    getOrderInfo: (order: Order) => Promise<OrderInfoV3>;
    getOrderStatus: (order: Order) => Promise<OrderStatusV3>;
    awaitTransactionHash: (txHash: string) => Promise<import("@ethersproject/abstract-provider").TransactionReceipt>;
    signOrder: (order: Order, addressOfWalletSigningOrder: string, signerOverride?: Signer | undefined, signingOptions?: Partial<SigningOptionsV3> | undefined) => Promise<SignedOrder>;
    buildOrder: (makerAssets: SwappableAsset[], takerAssets: SwappableAsset[], makerAddress: string, userConfig?: Partial<BuildOrderAdditionalConfig> | undefined) => Order;
    loadApprovalStatus: (asset: SwappableAsset, walletAddress: string) => Promise<import("../common/types").ApprovalStatus>;
    /**
     * @param asset Asset in the SDK format
     * @returns
     */
    approveTokenOrNftByAsset(asset: SwappableAsset, _walletAddress: string, // Remove in next release
    approvalTransactionOverrides?: Partial<TransactionOverrides>, otherOverrides?: Partial<ApprovalOverrides>): Promise<import("ethers").ContractTransaction>;
    getOrderHash: (order: Order) => string;
    getTypedData: (chainId: number, exchangeContractAddress: string, order: Order) => {
        domain: import("./types").EipDomain;
        types: {
            Order: {
                name: string;
                type: string;
            }[];
        };
        value: Order;
    };
    /**
     * Decodes readable order data (maker and taker assets) from the Order's encoded asset data
     * @param order : 0x Order (or Signed Order);
     * @returns Maker and taker assets for the order
     */
    getAssetsFromOrder: (order: Order) => {
        makerAssets: SwappableAsset[];
        takerAssets: SwappableAsset[];
    };
    checkIfOrderCanBeFilledWithNativeToken: (order: Order, wrappedNativeTokenContractAddress?: string | undefined) => boolean;
    fillSignedOrder: (signedOrder: SignedOrder, fillOverrides?: Partial<FillOrderOverrides> | undefined, transactionOverrides?: Partial<PayableOverrides>) => Promise<import("ethers").ContractTransaction>;
    private getGasMultipleForChainId;
    normalizeOrder: (order: Order) => Order;
    normalizeSignedOrder: (order: SignedOrder) => SignedOrder;
    verifyOrderSignature: (order: Order, signature: string, chainId: number, exchangeContractAddress: string) => boolean;
}
export { NftSwapV3 };
