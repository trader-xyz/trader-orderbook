import type { Signer } from '@ethersproject/abstract-signer';
import type { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { IZeroEx } from '../../contracts';
import type { ApprovalStatus, BaseNftSwap, PayableOverrides, TransactionOverrides } from '../common/types';
import type { ApprovalOverrides, FillOrderOverrides, NftOrderV4, NftOrderV4Serialized, OrderStructOptionsCommonStrict, SignedNftOrderV4, SigningOptionsV4, SwappableAssetV4, UserFacingERC1155AssetDataSerializedV4, UserFacingERC20AssetDataSerializedV4, UserFacingERC721AssetDataSerializedV4 } from './types';
import { PostOrderResponsePayload, SearchOrdersParams, SearchOrdersResponsePayload } from './orderbook';
import { OrderStatusV4 } from './enums';
export declare enum SupportedChainIdsV4 {
    Mainnet = 1,
    Ropsten = 3,
    Ubiq = 8,
    Ganache = 1337,
    Polygon = 137,
    PolygonMumbai = 80001,
    BSC = 56,
    Optimism = 10,
    Fantom = 250,
    Celo = 42220,
    Avalance = 43114,
    GaussMainnet = 1777,
    GILTestnet = 1452
}
export declare const SupportedChainsForV4OrderbookStatusMonitoring: SupportedChainIdsV4[];
export interface INftSwapV4 extends BaseNftSwap {
    signOrder: (order: NftOrderV4, signerAddress: string, signer: Signer, signingOptions?: Partial<SigningOptionsV4>) => Promise<SignedNftOrderV4>;
    buildNftAndErc20Order: (nft: UserFacingERC721AssetDataSerializedV4 | UserFacingERC1155AssetDataSerializedV4, erc20: UserFacingERC20AssetDataSerializedV4, sellOrBuyNft: 'sell' | 'buy', makerAddress: string, userConfig?: Partial<OrderStructOptionsCommonStrict>) => NftOrderV4Serialized;
    loadApprovalStatus: (asset: SwappableAssetV4, walletAddress: string, approvalOverrides?: Partial<ApprovalOverrides>) => Promise<ApprovalStatus>;
    approveTokenOrNftByAsset: (asset: SwappableAssetV4, walletAddress: string, approvalTransactionOverrides?: Partial<TransactionOverrides>, approvalOverrides?: Partial<ApprovalOverrides>) => Promise<ContractTransaction>;
    fillSignedOrder: (signedOrder: SignedNftOrderV4, fillOrderOverrides?: Partial<FillOrderOverrides>, transactionOverrides?: Partial<PayableOverrides>) => Promise<ContractTransaction>;
    awaitTransactionHash: (txHash: string) => Promise<TransactionReceipt>;
    cancelOrder: (nonce: BigNumberish, orderType: 'ERC721' | 'ERC1155') => Promise<ContractTransaction>;
    matchOrders: (sellOrder: SignedNftOrderV4, buyOrder: SignedNftOrderV4, transactionOverrides?: Partial<PayableOverrides>) => Promise<ContractTransaction>;
    getOrderStatus: (order: NftOrderV4) => Promise<OrderStatusV4>;
}
export interface AdditionalSdkConfig {
    appId: string;
    zeroExExchangeProxyContractAddress: string;
    orderbookRootUrl: string;
}
declare class NftSwapV4 implements INftSwapV4 {
    provider: BaseProvider;
    signer: Signer | undefined;
    chainId: number;
    exchangeProxyContractAddress: string;
    exchangeProxy: IZeroEx;
    appId: string;
    orderbookRootUrl: string;
    constructor(provider: BaseProvider, signer: Signer, chainId?: number | string, additionalConfig?: Partial<AdditionalSdkConfig>);
    /**
     * Checks if an asset is approved for trading with 0x v4
     * If an asset is not approved, call approveTokenOrNftByAsset to approve.
     * @param asset A tradeable asset (ERC20, ERC721, or ERC1155)
     * @param walletAddress The wallet address that owns the asset
     * @param approvalOverrides Optional config options for approving
     * @returns
     */
    loadApprovalStatus: (asset: SwappableAssetV4, walletAddress: string, approvalOverrides?: Partial<ApprovalOverrides> | undefined) => Promise<ApprovalStatus>;
    /**
     * Convenience function to await a transaction hash.
     * During a fill order call, you can get the pending transaction hash and await it manually via this method.
     * @param txHash Transaction hash to await
     * @returns
     */
    awaitTransactionHash: (txHash: string) => Promise<TransactionReceipt>;
    /**
     * Cancels an 0x v4 order. Once cancelled, the order no longer fillable.
     * Requires a signer
     * @param nonce
     * @param orderType
     * @returns Transaciton Receipt
     */
    cancelOrder: (nonce: BigNumberish, orderType: 'ERC721' | 'ERC1155') => Promise<ContractTransaction>;
    /**
     * Batch fill NFT sell orders
     * Can be used by taker to fill multiple NFT sell orders atomically.
     * E.g. A taker has a shopping cart full of NFTs to buy, can call this method to fill them all.
     * Requires a valid signer to execute transaction
     * @param signedOrders Signed 0x NFT sell orders
     * @param revertIfIncomplete Revert if we don't fill _all_ orders (defaults to false)
     * @param transactionOverrides Ethers transaciton overrides
     * @returns
     */
    batchBuyNfts: (signedOrders: Array<SignedNftOrderV4>, revertIfIncomplete?: boolean, transactionOverrides?: PayableOverrides | undefined) => Promise<ContractTransaction>;
    /**
     * Derives order hash from order (currently requires a provider to derive)
     * @param order A 0x v4 order (signed or unsigned)
     * @returns Order hash
     */
    getOrderHash: (order: NftOrderV4Serialized) => Promise<string>;
    /**
     * Looks up the order status for a given 0x v4 order.
     * (Available states for an order are 'filled', 'expired', )
     * @param order An 0x v4 NFT order
     * @returns A number the corresponds to the enum OrderStatusV4
     * Valid order states:
     * Invalid = 0
     * Fillable = 1,
     * Unfillable = 2,
     * Expired = 3,
     */
    getOrderStatus: (order: NftOrderV4) => Promise<number>;
    /**
     * Convenience function to approve an asset (ERC20, ERC721, or ERC1155) for trading with 0x v4
     * @param asset
     * @param _walletAddress
     * @param approvalTransactionOverrides
     * @param otherOverrides
     * @returns An ethers contract transaction
     */
    approveTokenOrNftByAsset: (asset: SwappableAssetV4, _walletAddress: string, approvalTransactionOverrides?: Partial<TransactionOverrides> | undefined, otherOverrides?: Partial<ApprovalOverrides> | undefined) => Promise<ContractTransaction>;
    /**
     * Builds a 0x order given two assets (either NFT<>ERC20 or ERC20<>NFT)
     * @param makerAsset An asset (ERC20, ERC721, or ERC1155) the user has
     * @param takerAsset An asset (ERC20, ERC721, or ERC1155) the user wants
     * @param makerAddress The address of the wallet creating the order
     * @param orderConfig Various order configuration options (e.g. expiration, nonce)
     */
    buildOrder(makerAsset: UserFacingERC1155AssetDataSerializedV4, takerAsset: UserFacingERC20AssetDataSerializedV4, makerAddress: string, orderConfig?: Partial<OrderStructOptionsCommonStrict>): NftOrderV4Serialized;
    buildOrder(makerAsset: UserFacingERC20AssetDataSerializedV4, takerAsset: UserFacingERC1155AssetDataSerializedV4, makerAddress: string, orderConfig?: Partial<OrderStructOptionsCommonStrict>): NftOrderV4Serialized;
    buildOrder(makerAsset: UserFacingERC721AssetDataSerializedV4, takerAsset: UserFacingERC20AssetDataSerializedV4, makerAddress: string, orderConfig?: Partial<OrderStructOptionsCommonStrict>): NftOrderV4Serialized;
    buildOrder(makerAsset: UserFacingERC20AssetDataSerializedV4, takerAsset: UserFacingERC721AssetDataSerializedV4, makerAddress: string, orderConfig?: Partial<OrderStructOptionsCommonStrict>): NftOrderV4Serialized;
    getWrappedTokenAddress: (chainId: number | string) => string | null;
    buildCollectionBasedOrder: (erc20ToSell: UserFacingERC20AssetDataSerializedV4, nftCollectionToBid: {
        tokenAddress: string;
        type: 'ERC721' | 'ERC1155';
    }, makerAddress: string) => NftOrderV4Serialized;
    buildNftAndErc20Order: (nft: SwappableAssetV4, erc20: UserFacingERC20AssetDataSerializedV4, sellOrBuyNft: "sell" | "buy" | undefined, makerAddress: string, userConfig?: Partial<OrderStructOptionsCommonStrict> | undefined) => NftOrderV4Serialized;
    /**
     * Signs a 0x order. Requires a signer (e.g. wallet or private key)
     * Once signed, the order becomes fillable (as long as the order is valid)
     * 0x orders require a signature to fill.
     * @param order A 0x v4 order
     * @returns A signed 0x v4 order
     */
    signOrder: (order: NftOrderV4) => Promise<SignedNftOrderV4>;
    /**
     * Fill a 'Buy NFT' order (e.g. taker would be selling'their NFT to fill this order) without needing an approval
     * Use case: Users can accept offers/bids for their NFTs without needing to approve their NFT! 🤯
     * @param signedOrder Signed Buy Nft order (e.g. direction = 1)
     * @param tokenId NFT token id that taker of trade will sell
     * @param fillOrderOverrides Trade specific (SDK-level) overrides
     * @param transactionOverrides General transaction overrides from ethers (gasPrice, gasLimit, etc)
     * @returns
     */
    fillBuyNftOrderWithoutApproval: (signedOrder: SignedNftOrderV4, tokenId: string, fillOrderOverrides?: Partial<FillOrderOverrides> | undefined, transactionOverrides?: Partial<PayableOverrides> | undefined) => Promise<ContractTransaction>;
    /**
     * Fills a 'collection'-based order (e.g. a bid for any nft belonging to a particular collection)
     * @param signedOrder A 0x signed collection order
     * @param tokenId The token id to fill for the collection order
     * @param fillOrderOverrides Various fill options
     * @param transactionOverrides Ethers transaction overrides
     * @returns
     */
    fillSignedCollectionOrder: (signedOrder: SignedNftOrderV4, tokenId: BigNumberish, fillOrderOverrides?: Partial<FillOrderOverrides> | undefined, transactionOverrides?: Partial<PayableOverrides> | undefined) => Promise<ContractTransaction>;
    isErc20NativeToken: (order: NftOrderV4) => boolean;
    /**
     * Fills a signed order
     * @param signedOrder A signed 0x v4 order
     * @param fillOrderOverrides Optional configuration on possible ways to fill the order
     * @param transactionOverrides Ethers transaction overrides (e.g. gas price)
     * @returns
     */
    fillSignedOrder: (signedOrder: SignedNftOrderV4, fillOrderOverrides?: Partial<FillOrderOverrides> | undefined, transactionOverrides?: Partial<PayableOverrides> | undefined) => Promise<ContractTransaction>;
    /**
     * Posts a 0x order to the Trader.xyz NFT open orderbook
     * @param signedOrder A valid 0x v4 signed order
     * @param chainId The chain id (e.g. '1' for mainnet, or '137' for polygon mainnet)
     * @param metadata An optional record object (key: string, value: string) that will be stored alongside the order in the orderbook
     * This is helpful for webapp builders, as they can save app-level order metadata
     * (e.g. maybe save a 'bidMessage' alongside the order, or extra image metadata)
     * @returns
     */
    postOrder: (signedOrder: SignedNftOrderV4, chainId: string | number, metadata?: Record<string, string> | undefined) => Promise<PostOrderResponsePayload>;
    /**
     * Gets orders from the Trader.xyz Open NFT Orderbook
     * By default will find all order, active orders.
     * @param filters Various options to filter an order search
     * @returns An object that includes `orders` key with an array of orders that meet the search critera
     */
    getOrders: (filters?: Partial<SearchOrdersParams> | undefined) => Promise<SearchOrdersResponsePayload>;
    /**
     *
     * @param sellOrder ERC721 Order to sell an NFT
     * @param buyOrder ERC721 Order to buy an NFT
     * @param transactionOverrides Ethers transaction overrides
     * @returns
     */
    matchOrders: (sellOrder: SignedNftOrderV4, buyOrder: SignedNftOrderV4, transactionOverrides?: Partial<PayableOverrides> | undefined) => Promise<ContractTransaction>;
    getMakerAsset: (order: NftOrderV4) => SwappableAssetV4;
    getTakerAsset: (order: NftOrderV4) => SwappableAssetV4;
    /**
     * Validate an order signature given a signed order
     * Throws if invalid
     * @param signedOrder A 0x v4 signed order to validate signature for
     * @returns
     */
    validateSignature: (signedOrder: SignedNftOrderV4) => Promise<boolean>;
    /**
     * Fetches the balance of an asset for a given wallet address
     * @param asset A Tradeable asset -- An ERC20, ERC721, or ERC1155
     * @param walletAddress A wallet address ('0x1234...6789')
     * @param provider Optional, defaults to the class's provider but can be overridden
     * @returns A BigNumber balance (e.g. 1 or 0 for ERC721s. ERC20 and ERC1155s can have balances greater than 1)
     */
    fetchBalanceForAsset: (asset: SwappableAssetV4, walletAddress: string, provider?: BaseProvider) => Promise<BigNumber>;
    checkOrderCanBeFilledTakerSide: (order: NftOrderV4, takerWalletAddress: string) => Promise<{
        approvalStatus: ApprovalStatus;
        balance: string;
        isApproved: boolean;
        hasBalance: boolean;
        canOrderBeFilled: boolean;
    }>;
    checkOrderCanBeFilledMakerSide: (order: NftOrderV4) => Promise<{
        approvalStatus: ApprovalStatus;
        balance: string;
        isApproved: boolean;
        hasBalance: boolean;
        canOrderBeFilled: boolean;
    }>;
    /**
     * Convenience function to sum all fees. Total fees denominated in erc20 token amount.
     * @param order A 0x v4 order (signed or un-signed);
     * @returns Total summed fees for a 0x v4 order. Amount is represented in Erc20 token units.
     */
    getTotalFees: (order: NftOrderV4) => BigNumber;
    /**
     * Calculates total order cost.
     * In 0x v4, fees are additive (i.e. they are not deducted from the order amount, but added on top of)
     * @param order A 0x v4 order;
     * @returns Total cost of an order (base amount + fees). Amount is represented in Erc20 token units. Does not include gas costs.
     */
    getErc20TotalIncludingFees: (order: NftOrderV4) => BigNumber;
}
export { NftSwapV4 };
