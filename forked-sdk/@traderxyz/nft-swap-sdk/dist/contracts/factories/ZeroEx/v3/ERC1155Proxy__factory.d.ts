import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { ERC1155Proxy, ERC1155ProxyInterface } from '../../../ZeroEx/v3/ERC1155Proxy';
export declare class ERC1155Proxy__factory {
    static readonly abi: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    })[];
    static createInterface(): ERC1155ProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155Proxy;
}
