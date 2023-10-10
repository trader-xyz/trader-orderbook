import type { ContractAddresses, SupportedTokenTypes } from '../../sdk/v3/types';
export declare const getProxyAddressForErcType: (assetType: SupportedTokenTypes, chainId: number, addresses?: ContractAddresses) => string;
export declare const getForwarderAddress: (chainId: number, addresses?: ContractAddresses) => string;
export declare const getWrappedNativeToken: (chainId: number, addresses?: ContractAddresses) => string | null;
