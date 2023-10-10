import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
export interface TypedData {
    domain: TypedDataDomain;
    types: Record<string, Array<TypedDataField>>;
    message: Record<string, any>;
    primaryType?: string;
}
export type { TypedDataDomain, TypedDataField };
export declare const encodeTypedDataHash: (typedData: TypedData) => string;
export declare const encodeTypedDataDigest: (typedData: TypedData) => Uint8Array;
