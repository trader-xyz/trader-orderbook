import { BigNumber } from '@ethersproject/bignumber';
export declare const CRYPTO_KITTIES_CONTRACT_ADDRESS = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
export declare const ETH_GAS_STATION_API_BASE_URL = "https://ethgasstation.info";
export declare const ETH_GAS_STATION_GAS_ENDPOINT: string;
export declare const MAX_UINT256: BigNumber;
export declare const UNLIMITED_ALLOWANCE_IN_BASE_UNITS: BigNumber;
export declare const GWEI_IN_WEI: BigNumber;
export declare const GWEI_IN_ETH: BigNumber;
export declare const ZERO_AMOUNT: BigNumber;
export declare const ONE_AMOUNT: BigNumber;
export declare const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const NULL_BYTES = "0x";
export declare const BASE_TEN = 10;
export declare const ONE_NFT_UNIT: BigNumber;
export declare const ZERO_NFT_UNIT: BigNumber;
export declare const DEFAULT_ERC20_TOKEN_DECIMALS: BigNumber;
export declare type Numberish = BigNumber | number | string;
declare const isENSAddressFormat: (address: string) => boolean;
declare const getEthPriceInUsd: () => Promise<number | undefined>;
/**
 *
 * @returns gas price in wei (base unit), need to convert to eth
 */
export interface ObjectMap<T> {
    [key: string]: T;
}
declare const arrayToMapWithId: <T extends object>(array: T[], idKey: keyof T) => ObjectMap<T>;
declare const isHexAddressFormat: (address: string) => boolean;
export declare function getUrlForFallbackTokenIcon(address: string): string | null;
declare const getShortenedAddress: (address: string, start?: number, end?: number) => string;
export declare const toUnitAmount: (amount: BigNumber, decimals: number) => BigNumber;
export declare const getEtherscanLinkFromTxHash: (txHash: string, chainId: number) => string | undefined;
export declare const getEtherscanLinkForAccount: (account: string, chainId: number) => string | undefined;
export { isENSAddressFormat, isHexAddressFormat, getEthPriceInUsd, arrayToMapWithId, getShortenedAddress, };
