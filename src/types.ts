// --------------------------
/// Order types from 0x protocol
// --------------------------
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import type { BytesLike } from '@ethersproject/bytes'
import type { Prisma } from '@prisma/client'

// export type FeeStruct = {
//   recipient: string;
//   amount: BigNumberish;
//   feeData: string | Array<number>;
// };

export type FeeStructSerialized = {
  recipient: string
  amount: string
  feeData: string
}

// export type PropertyStruct = {
//   propertyValidator: string;
//   propertyData: string | Array<number>;
// };

export type PropertyStructSerialized = {
  propertyValidator: string
  propertyData: string | Array<number>
}

// export type ERC1155OrderStruct = {
//   direction: BigNumberish;
//   maker: string;
//   taker: string;
//   expiry: BigNumberish;
//   nonce: BigNumberish;
//   erc20Token: string;
//   erc20TokenAmount: BigNumberish;
//   fees: FeeStruct[];
//   erc1155Token: string;
//   erc1155TokenId: BigNumberish;
//   erc1155TokenProperties: PropertyStruct[];
//   erc1155TokenAmount: BigNumberish;
// };

export type ERC1155OrderStructSerialized = {
  direction: number
  maker: string
  taker: string
  expiry: string
  nonce: string
  erc20Token: string
  erc20TokenAmount: string
  fees: FeeStructSerialized[]
  erc1155Token: string
  erc1155TokenId: string
  erc1155TokenProperties: PropertyStructSerialized[]
  erc1155TokenAmount: string
}

// export type ERC721OrderStruct = {
//   direction: BigNumberish;
//   maker: string;
//   taker: string;
//   expiry: BigNumberish;
//   nonce: BigNumberish;
//   erc20Token: string;
//   erc20TokenAmount: BigNumberish;
//   fees: FeeStruct[];
//   erc721Token: string;
//   erc721TokenId: BigNumberish;
//   erc721TokenProperties: PropertyStruct[];
// };

export type ERC721OrderStructSerialized = {
  direction: number
  maker: string
  taker: string
  expiry: string
  nonce: string
  erc20Token: string
  erc20TokenAmount: string
  fees: FeeStructSerialized[]
  erc721Token: string
  erc721TokenId: string
  erc721TokenProperties: PropertyStructSerialized[]
}

// export type UserFacingFeeStruct = {
//   recipient: string;
//   amount: BigNumberish;
//   // Make fee data optional for devx (most folks don't use the feeData arg and it _needs_ to be '0x' if not being used).
//   // automatically defaults to '0x'
//   feeData?: BytesLike;
// };

// export interface OrderStructOptionsCommon {
//   direction: BigNumberish;
//   maker: string;
//   taker: string;
//   expiry: Date | number;
//   nonce: BigNumberish;
//   // erc20Token: string;
//   // erc20TokenAmount: BigNumberish;
//   fees: UserFacingFeeStruct[];
//   tokenProperties: PropertyStruct[];
// }

// export interface OrderStructOptionsCommonStrict {
//   direction: BigNumberish;
//   // erc20Token: string;
//   // erc20TokenAmount: BigNumberish;
//   maker: string;
//   taker?: string;
//   expiry?: Date | number;
//   nonce?: BigNumberish;
//   fees?: UserFacingFeeStruct[];
//   tokenProperties?: PropertyStruct[];
// }

// export interface Fee {
//   recipient: string;
//   amount: BigNumber;
//   feeData: string;
// }

// export interface Property {
//   propertyValidator: string;
//   propertyData: string;
// }

// export type NftOrderV4 = ERC1155OrderStruct | ERC721OrderStruct;

export type NftOrderV4Serialized = ERC1155OrderStructSerialized | ERC721OrderStructSerialized

// export interface SignedERC721OrderStruct extends ERC721OrderStruct {
//   signature: SignatureStruct;
// }

// export interface SignedERC1155OrderStruct extends ERC1155OrderStruct {
//   signature: SignatureStruct;
// }

export interface SignedERC721OrderStructSerialized extends ERC721OrderStructSerialized {
  signature: SignatureStructSerialized
}

export interface SignedERC1155OrderStructSerialized extends ERC1155OrderStructSerialized {
  signature: SignatureStructSerialized
}

// export type SignedNftOrderV4 =
//   | SignedERC721OrderStruct
//   | SignedERC1155OrderStruct;

export type SignedNftOrderV4Serialized = SignedERC721OrderStructSerialized | SignedERC1155OrderStructSerialized

export type ECSignature = {
  v: number
  r: string
  s: string
}

export type SignatureStruct = {
  signatureType: number // 2 for EIP-712
  v: number
  r: string
  s: string
}

export type SignatureStructSerialized = {
  signatureType: number // 2 for EIP-712
  v: number
  r: string
  s: string
}

// --------------------------
// Order types from database/prisma
// --------------------------

// /**
//  * From https://github.com/sindresorhus/type-fest/
//  * Matches a JSON object.
//  * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
//  */
//  export type JsonObject = { [Key in string]?: JsonValue }

//  /**
//   * From https://github.com/sindresorhus/type-fest/
//   * Matches a JSON array.
//   */
//  export interface JsonArray extends Array<JsonValue> {}

//  /**
//   * From https://github.com/sindresorhus/type-fest/
//   * Matches any valid JSON value.
//   */
//  export type JsonValue = string | number | boolean | JsonObject | JsonArray

export interface NftOrderV4DatabaseModelZod {
  id: string
  maker: string
  taker: string
  expiry: string
  expiry_datetime: Date
  nonce: string
  erc20_token: string
  erc20_token_amount: string
  fees: Array<FeeStructSerialized>
  nft_token: string
  nft_token_id: string
  nft_token_amount: string
  nft_token_properties: Array<PropertyStructSerialized>
  system_metadata?: any //Record<any, any>
  app_metadata?: any // Record<any, any>
  chain_id: string
  verifying_contract: string
  direction: string
  signature: SignatureStruct
  nft_type: string
  date_added: Date
  date_last_updated: Date
}
