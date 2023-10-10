import { BigNumber } from '@ethersproject/bignumber';
/**
 * Convert a big number with a custom number of decimals to a stringified fixed-point number.
 */
export declare function fromBn(x: BigNumber, decimals?: number): string;
