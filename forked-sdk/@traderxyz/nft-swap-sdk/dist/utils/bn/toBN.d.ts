import type { BigNumber } from '@ethersproject/bignumber';
/**
 * Convert a stringified fixed-point number to a big number with a custom number of decimals.
 *
 * @remarks
 * - Accepts scientific notation.
 * - Checks are in place to adhere to the numerical constraints of the EVM.
 */
export declare function toBn(x: string, decimals?: number): BigNumber;
