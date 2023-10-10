import unfetch from 'isomorphic-unfetch';
import type { SignedNftOrderV4, SignedNftOrderV4Serialized } from './types';
export declare const ORDERBOOK_API_ROOT_URL_PRODUCTION = "https://api.trader.xyz";
export interface OrderbookRequestOptions {
    rootUrl: string;
}
export interface PostOrderRequestPayload {
    order: SignedNftOrderV4Serialized;
    chainId: string;
    metadata?: Record<string, string>;
}
export interface PostOrderResponsePayload {
    erc20Token: string;
    erc20TokenAmount: string;
    nftToken: string;
    nftTokenId: string;
    nftTokenAmount: string;
    nftType: string;
    sellOrBuyNft: 'buy' | 'sell';
    chainId: string;
    order: SignedNftOrderV4Serialized;
    metadata: Record<string, string> | null;
}
export interface SearchOrdersResponsePayload {
    orders: Array<PostOrderResponsePayload>;
}
declare const postOrderToOrderbook: (signedOrder: SignedNftOrderV4, chainId: string | number, metadata?: Record<string, string>, requestOptions?: Partial<OrderbookRequestOptions> | undefined, fetchFn?: typeof unfetch) => Promise<PostOrderResponsePayload>;
/**
 * Available query parameters for searching the orderbook
 */
export interface SearchOrdersParams {
    nftTokenId: string | string[];
    erc20Token: string | string[];
    nftToken: string | string[];
    nftType: 'ERC721' | 'ERC1155';
    chainId: string | number | string[] | number[];
    maker: string;
    taker: string;
    nonce: string | string[];
    offset: string | number;
    limit: string | number;
    sellOrBuyNft: 'sell' | 'buy';
    direction: '0' | '1';
    status: 'open' | 'filled' | 'expired' | 'cancelled' | 'all';
    visibility: 'public' | 'private';
    valid: 'valid' | 'all';
}
/**
 * Search through the public hosted orderbook
 * @param filters Optional query param filters
 * @param requestOptions Fetch options/overrides
 * @param fetchFn Optional fetch function override. Uses unfetch by default.
 * @returns
 */
declare const searchOrderbook: (filters?: Partial<SearchOrdersParams> | undefined, requestOptions?: Partial<OrderbookRequestOptions> | undefined, fetchFn?: typeof unfetch) => Promise<SearchOrdersResponsePayload>;
export { postOrderToOrderbook, searchOrderbook };
