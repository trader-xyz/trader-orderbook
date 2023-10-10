import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { ERC1155, ERC1155Interface } from '../ERC1155';
export declare class ERC1155__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): ERC1155Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155;
}
