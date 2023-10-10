import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { StaticCallProxy, StaticCallProxyInterface } from '../../../ZeroEx/v3/StaticCallProxy';
export declare class StaticCallProxy__factory {
    static readonly abi: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
    } | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): StaticCallProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): StaticCallProxy;
}
