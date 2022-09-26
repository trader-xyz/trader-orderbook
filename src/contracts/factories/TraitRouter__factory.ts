/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../common'
import type { TraitRouter, TraitRouterInterface } from '../TraitRouter'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'traitValidatorAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'traitValidator',
    outputs: [
      {
        internalType: 'contract TraitValidator',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'zeroExV4',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

const _bytecode =
  '0x60a060405273def1c0ded9bec7f1a1670819833240f027b25eff60805234801561002857600080fd5b50604051610e77380380610e778339810160408190526100479161006c565b600080546001600160a01b0319166001600160a01b039290921691909117905561009c565b60006020828403121561007e57600080fd5b81516001600160a01b038116811461009557600080fd5b9392505050565b608051610dba6100bd60003960008181609401526101dd0152610dba6000f3fe6080604052600436106100385760003560e01c8063150b7a021461004457806319d5643f14610082578063d6839196146100ce57600080fd5b3661003f57005b600080fd5b34801561005057600080fd5b5061006461005f3660046103da565b6100ee565b6040516001600160e01b031990911681526020015b60405180910390f35b34801561008e57600080fd5b506100b67f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610079565b3480156100da57600080fd5b506000546100b6906001600160a01b031681565b6000808080808061010187890189610931565b945094509450945094508261010001516001600160a01b0316336001600160a01b0316146101675760405162461bcd60e51b815260206004820152600e60248201526d24b73b30b634b21039b2b73232b960911b60448201526064015b60405180910390fd5b60005460405163efff44f360e01b81526001600160a01b039091169063efff44f3906101999088908890600401610a75565b600060405180830381600087803b1580156101b357600080fd5b505af11580156101c7573d6000803e3d6000fd5b50505050336001600160a01b031663b88d4fde307f00000000000000000000000000000000000000000000000000000000000000008c87878760405160200161021293929190610c19565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016102409493929190610d23565b600060405180830381600087803b15801561025a57600080fd5b505af115801561026e573d6000803e3d6000fd5b50505050801561031b5760c08301516040516000916001600160a01b038d16918381818185875af1925050503d80600081146102c6576040519150601f19603f3d011682016040523d82523d6000602084013e6102cb565b606091505b50509050806103155760405162461bcd60e51b815260206004820152601660248201527510dbdd5b19081b9bdd081cd95b99081c185e5b595b9d60521b604482015260640161015e565b5061039b565b60a083015160c084015160405163a9059cbb60e01b81526001600160a01b038d81166004830152602482019290925291169063a9059cbb906044016020604051808303816000875af1158015610375573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103999190610d60565b505b50630a85bd0160e11b9a9950505050505050505050565b6001600160a01b03811681146103c757600080fd5b50565b80356103d5816103b2565b919050565b6000806000806000608086880312156103f257600080fd5b85356103fd816103b2565b9450602086013561040d816103b2565b93506040860135925060608601356001600160401b038082111561043057600080fd5b818801915088601f83011261044457600080fd5b81358181111561045357600080fd5b89602082850101111561046557600080fd5b9699959850939650602001949392505050565b634e487b7160e01b600052604160045260246000fd5b604051606081016001600160401b03811182821017156104b0576104b0610478565b60405290565b604080519081016001600160401b03811182821017156104b0576104b0610478565b60405161016081016001600160401b03811182821017156104b0576104b0610478565b60405160c081016001600160401b03811182821017156104b0576104b0610478565b604051601f8201601f191681016001600160401b038111828210171561054557610545610478565b604052919050565b803560ff811681146103d557600080fd5b600082601f83011261056f57600080fd5b81356001600160401b0381111561058857610588610478565b61059b601f8201601f191660200161051d565b8181528460208386010111156105b057600080fd5b816020850160208301376000918101602001919091529392505050565b8035600281106103d557600080fd5b60006001600160401b038211156105f5576105f5610478565b5060051b60200190565b600082601f83011261061057600080fd5b81356020610625610620836105dc565b61051d565b82815260059290921b8401810191818101908684111561064457600080fd5b8286015b848110156106d85780356001600160401b03808211156106685760008081fd5b908801906060828b03601f19018113156106825760008081fd5b61068a61048e565b87840135610697816103b2565b8152604084810135898301529184013591838311156106b65760008081fd5b6106c48d8a8588010161055e565b908201528652505050918301918301610648565b509695505050505050565b600082601f8301126106f457600080fd5b81356020610704610620836105dc565b82815260059290921b8401810191818101908684111561072357600080fd5b8286015b848110156106d85780356001600160401b03808211156107475760008081fd5b908801906040828b03601f19018113156107615760008081fd5b6107696104b6565b87840135610776816103b2565b815290830135908282111561078b5760008081fd5b6107998c898487010161055e565b818901528652505050918301918301610727565b600061016082840312156107c057600080fd5b6107c86104d8565b90506107d3826105cd565b81526107e1602083016103ca565b60208201526107f2604083016103ca565b6040820152606082013560608201526080820135608082015261081760a083016103ca565b60a082015260c082013560c082015260e08201356001600160401b038082111561084057600080fd5b61084c858386016105ff565b60e084015261010091506108618285016103ca565b82840152610120915081840135828401526101409150818401358181111561088857600080fd5b610894868287016106e3565b8385015250505092915050565b6000608082840312156108b357600080fd5b604051608081018181106001600160401b03821117156108d5576108d5610478565b6040529050808235600581106108ea57600080fd5b81526108f86020840161054d565b602082015260408301356040820152606083013560608201525092915050565b80151581146103c757600080fd5b80356103d581610918565b6000806000806000610100868803121561094a57600080fd5b8535945060208601356001600160401b038082111561096857600080fd5b9087019060c0828a03121561097c57600080fd5b6109846104fb565b61098d8361054d565b81526020830135602082015260408301356040820152606083013560608201526080830135608082015260a0830135828111156109c957600080fd5b6109d58b82860161055e565b60a083015250955060408801359150808211156109f157600080fd5b506109fe888289016107ad565b935050610a0e87606088016108a1565b9150610a1c60e08701610926565b90509295509295909350565b6000815180845260005b81811015610a4e57602081850181015186830182015201610a32565b81811115610a60576000602083870101525b50601f01601f19169290920160200192915050565b8281526040602082015260ff82511660408201526020820151606082015260408201516080820152606082015160a0820152608082015160c0820152600060a083015160c060e0840152610acd610100840182610a28565b95945050505050565b634e487b7160e01b600052602160045260246000fd5b60028110610afc57610afc610ad6565b9052565b600081518084526020808501808196508360051b8101915082860160005b85811015610b71578284038952815180516001600160a01b031685528581015186860152604090810151606091860182905290610b5d81870183610a28565b9a87019a9550505090840190600101610b1e565b5091979650505050505050565b600081518084526020808501808196508360051b8101915082860160005b85811015610b71578284038952815180516001600160a01b031685528501516040868601819052610bcf81870183610a28565b9a87019a9550505090840190600101610b9c565b805160058110610bf557610bf5610ad6565b825260208181015160ff169083015260408082015190830152606090810151910152565b60c08152610c2b60c082018551610aec565b60006020850151610c4760e08401826001600160a01b03169052565b506040850151610100610c64818501836001600160a01b03169052565b60608701519150610120828186015260808801519250610140838187015260a08901519350610160610ca0818801866001600160a01b03169052565b60c08a015161018088015260e08a01519450806101a088015250610cc8610220870185610b00565b928901516001600160a01b03166101c0870152908801516101e086015287015160bf1985830301610200860152909150610d028282610b7e565b92505050610d136020830185610be3565b82151560a0830152949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610d5690830184610a28565b9695505050505050565b600060208284031215610d7257600080fd5b8151610d7d81610918565b939250505056fea264697066735822122059894ce2d5722ce8115c704f89accd83c8c8d17b675a6f26470eadade9176f1f64736f6c634300080d0033'

type TraitRouterConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: TraitRouterConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class TraitRouter__factory extends ContractFactory {
  constructor(...args: TraitRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    traitValidatorAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TraitRouter> {
    return super.deploy(traitValidatorAddress, overrides || {}) as Promise<TraitRouter>
  }
  override getDeployTransaction(
    traitValidatorAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(traitValidatorAddress, overrides || {})
  }
  override attach(address: string): TraitRouter {
    return super.attach(address) as TraitRouter
  }
  override connect(signer: Signer): TraitRouter__factory {
    return super.connect(signer) as TraitRouter__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): TraitRouterInterface {
    return new utils.Interface(_abi) as TraitRouterInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TraitRouter {
    return new Contract(address, _abi, signerOrProvider) as TraitRouter
  }
}
