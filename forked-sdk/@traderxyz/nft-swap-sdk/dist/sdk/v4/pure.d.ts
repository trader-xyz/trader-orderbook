import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import type { BaseProvider } from '@ethersproject/providers';
import type { ContractTransaction } from '@ethersproject/contracts';
import type { ECSignature, ERC721OrderStructSerialized, ERC1155OrderStructSerialized, NftOrderV4, OrderStructOptionsCommon, OrderStructOptionsCommonStrict, SignedNftOrderV4, SignedNftOrderV4Serialized, SwappableAssetV4, UserFacingERC20AssetDataSerializedV4, UserFacingERC721AssetDataSerializedV4, UserFacingERC1155AssetDataSerializedV4, ApprovalOverrides } from './types';
import { ApprovalStatus, TransactionOverrides } from '../common/types';
export declare const signOrderWithEoaWallet: (order: NftOrderV4, signer: TypedDataSigner, chainId: number, exchangeContractAddress: string) => Promise<string>;
/**
 *
 * @param walletAddress Owner of the asset
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param provider
 * @returns
 */
export declare const getApprovalStatus: (walletAddress: string, exchangeProxyAddressForAsset: string, asset: SwappableAssetV4, provider: BaseProvider) => Promise<ApprovalStatus>;
export declare const MAX_APPROVAL: BigNumber;
/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */
export declare const approveAsset: (exchangeProxyAddressForAsset: string, asset: SwappableAssetV4, signer: Signer, txOverrides?: Partial<TransactionOverrides>, approvalOrderrides?: Partial<ApprovalOverrides> | undefined) => Promise<ContractTransaction>;
export declare function parseRawSignature(rawSignature: string): ECSignature;
export declare const INFINITE_EXPIRATION_TIMESTAMP_SEC: BigNumber;
export declare const generateErc721Order: (nft: UserFacingERC721AssetDataSerializedV4, erc20: UserFacingERC20AssetDataSerializedV4, orderData: Partial<OrderStructOptionsCommon> & OrderStructOptionsCommonStrict) => ERC721OrderStructSerialized;
export declare const generateErc1155Order: (nft: UserFacingERC1155AssetDataSerializedV4, erc20: UserFacingERC20AssetDataSerializedV4, orderData: Partial<OrderStructOptionsCommon> & OrderStructOptionsCommonStrict) => ERC1155OrderStructSerialized;
export declare const ONE_TWENTY_EIGHT_BIT_LENGTH = 39;
export declare const TWO_FIFTY_SIX_BIT_LENGTH = 78;
export declare const RESERVED_APP_ID_PREFIX = "1001";
export declare const DEFAULT_APP_ID = "314159";
export declare const verifyAppIdOrThrow: (appId: string) => void;
/**
 * Generates a 256bit nonce.
 * The format:
 *   First 128bits:  ${SDK_PREFIX}${APP_ID}000000 (right padded zeroes to fill)
 *   Second 128bits: ${RANDOM_GENERATED_128BIT_ORDER_HASH}
 * @returns 128bit nonce as string (0x orders can handle up to 256 bit nonce)
 */
export declare const generateRandomV4OrderNonce: (appId?: string) => string;
export declare const generateRandom128BitNumber: (base?: number) => string;
export declare const serializeNftOrder: (signedOrder: SignedNftOrderV4) => SignedNftOrderV4Serialized;
