import type { Signer } from '@ethersproject/abstract-signer';
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import type { IZeroEx } from '../../contracts';
export declare type FeeStruct = {
    recipient: string;
    amount: BigNumberish;
    feeData: string | Array<number>;
};
export declare type FeeStructSerialized = {
    recipient: string;
    amount: string;
    feeData: string;
};
export declare type PropertyStruct = {
    propertyValidator: string;
    propertyData: string | Array<number>;
};
export declare type PropertyStructSerialized = {
    propertyValidator: string;
    propertyData: string | Array<number>;
};
export declare type ERC1155OrderStruct = {
    direction: BigNumberish;
    maker: string;
    taker: string;
    expiry: BigNumberish;
    nonce: BigNumberish;
    erc20Token: string;
    erc20TokenAmount: BigNumberish;
    fees: FeeStruct[];
    erc1155Token: string;
    erc1155TokenId: BigNumberish;
    erc1155TokenProperties: PropertyStruct[];
    erc1155TokenAmount: BigNumberish;
};
export declare type ERC1155OrderStructSerialized = {
    direction: number;
    maker: string;
    taker: string;
    expiry: string;
    nonce: string;
    erc20Token: string;
    erc20TokenAmount: string;
    fees: FeeStructSerialized[];
    erc1155Token: string;
    erc1155TokenId: string;
    erc1155TokenProperties: PropertyStructSerialized[];
    erc1155TokenAmount: string;
};
export declare type ERC721OrderStruct = {
    direction: BigNumberish;
    maker: string;
    taker: string;
    expiry: BigNumberish;
    nonce: BigNumberish;
    erc20Token: string;
    erc20TokenAmount: BigNumberish;
    fees: FeeStruct[];
    erc721Token: string;
    erc721TokenId: BigNumberish;
    erc721TokenProperties: PropertyStruct[];
};
export declare type ERC721OrderStructSerialized = {
    direction: number;
    maker: string;
    taker: string;
    expiry: string;
    nonce: string;
    erc20Token: string;
    erc20TokenAmount: string;
    fees: FeeStructSerialized[];
    erc721Token: string;
    erc721TokenId: string;
    erc721TokenProperties: PropertyStructSerialized[];
};
export declare type UserFacingFeeStruct = {
    recipient: string;
    amount: BigNumberish;
    feeData?: BytesLike;
};
export interface OrderStructOptionsCommon {
    direction: BigNumberish;
    maker: string;
    taker: string;
    appId: string;
    expiry: Date | number;
    nonce: BigNumberish;
    fees: UserFacingFeeStruct[];
    tokenProperties: PropertyStruct[];
}
export interface OrderStructOptionsCommonStrict {
    direction: BigNumberish;
    maker: string;
    appId?: string;
    taker?: string;
    expiry?: Date | number;
    nonce?: BigNumberish;
    fees?: UserFacingFeeStruct[];
    tokenProperties?: PropertyStruct[];
}
export interface Fee {
    recipient: string;
    amount: BigNumber;
    feeData: string;
}
export interface Property {
    propertyValidator: string;
    propertyData: string;
}
export declare type NftOrderV4 = ERC1155OrderStruct | ERC721OrderStruct;
export declare type NftOrderV4Serialized = ERC1155OrderStructSerialized | ERC721OrderStructSerialized;
export interface SignedERC721OrderStruct extends ERC721OrderStruct {
    signature: SignatureStruct;
}
export interface SignedERC1155OrderStruct extends ERC1155OrderStruct {
    signature: SignatureStruct;
}
export interface SignedERC721OrderStructSerialized extends ERC721OrderStructSerialized {
    signature: SignatureStructSerialized;
}
export interface SignedERC1155OrderStructSerialized extends ERC1155OrderStructSerialized {
    signature: SignatureStructSerialized;
}
export declare type SignedNftOrderV4 = SignedERC721OrderStruct | SignedERC1155OrderStruct;
export declare type SignedNftOrderV4Serialized = SignedERC721OrderStructSerialized | SignedERC1155OrderStructSerialized;
export declare type ECSignature = {
    v: number;
    r: string;
    s: string;
};
export declare type SignatureStruct = {
    signatureType: number;
    v: number;
    r: string;
    s: string;
};
export declare type SignatureStructSerialized = {
    signatureType: number;
    v: number;
    r: string;
    s: string;
};
export interface ApprovalOverrides {
    signer: Signer;
    approve: boolean;
    approvalOnlyTokenIdIfErc721: boolean;
    exchangeContractAddress: string;
    chainId: number;
}
export interface FillOrderOverrides {
    signer: Signer;
    exchangeContract: IZeroEx;
    tokenIdToSellForCollectionOrder?: BigNumberish;
    /**
     * Fill order with native token if possible
     * e.g. If taker asset is WETH, allows order to be filled with ETH
     */
    fillOrderWithNativeTokenInsteadOfWrappedToken: boolean;
}
export interface BuildOrderAdditionalConfig {
    direction: BigNumberish;
    maker: string;
    taker: string;
    expiry: BigNumberish;
    nonce: BigNumberish;
}
export declare type AvailableSignatureTypesV4 = 'eoa';
export interface SigningOptionsV4 {
    signatureType: AvailableSignatureTypesV4;
    autodetectSignatureType: boolean;
}
export interface AddressesForChainV4 {
    exchange: string;
    wrappedNativeToken: string;
}
export interface UserFacingERC20AssetDataSerializedV4 {
    tokenAddress: string;
    type: 'ERC20';
    amount: string;
}
export interface UserFacingERC721AssetDataSerializedV4 {
    tokenAddress: string;
    tokenId: string;
    type: 'ERC721';
}
/**
 * Mimic the erc721 duck type
 */
export interface UserFacingERC1155AssetDataSerializedV4 {
    tokenAddress: string;
    tokenId: string;
    type: 'ERC1155';
    amount?: string;
}
export declare type SwappableNftV4 = UserFacingERC721AssetDataSerializedV4 | UserFacingERC1155AssetDataSerializedV4;
export declare type SwappableAssetV4 = UserFacingERC20AssetDataSerializedV4 | UserFacingERC721AssetDataSerializedV4 | UserFacingERC1155AssetDataSerializedV4;
export interface VerifyOrderOptionsOverrides {
    verifyApproval?: boolean;
    verifyBalance?: boolean;
}
