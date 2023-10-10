import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { ERC20Proxy, ERC20ProxyInterface } from '../../../ZeroEx/v3/ERC20Proxy';
export declare class ERC20Proxy__factory {
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
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
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
    static createInterface(): ERC20ProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Proxy;
}
