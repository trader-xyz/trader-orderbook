/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import type { Provider } from '@ethersproject/providers'
import type { Trustus, TrustusInterface } from '../Trustus'

const _abi = [
  {
    inputs: [],
    name: 'Trustus__InvalidPacket',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export class Trustus__factory {
  static readonly abi = _abi
  static createInterface(): TrustusInterface {
    return new utils.Interface(_abi) as TrustusInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Trustus {
    return new Contract(address, _abi, signerOrProvider) as Trustus
  }
}
