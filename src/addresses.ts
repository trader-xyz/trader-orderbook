export interface AddressesForChain {
  exchange: string
  wrappedNativeToken: string
}

const addresses: { [key: string]: AddressesForChain | undefined } = {
  '1': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  '3': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xc778417e063141139fce010982780140aa0cd5ab',
  },
  '4': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xc778417e063141139fce010982780140aa0cd5ab',
  },
  '5': {
    exchange: '0xf91bb752490473b8342a3e964e855b9f9a2a668e',
    wrappedNativeToken: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
  },
  '10': {
    exchange: '0xdef1abe32c034e558cdd535791643c58a13acc10',
    wrappedNativeToken: '',
  },
  '42': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  },
  '56': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  '1337': {
    exchange: '0x5315e44798395d4a952530d131249fe00f554565',
    wrappedNativeToken: '0x0b1ba0af832d7c05fd64161e0db78e85978e8082',
  },
  '137': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  },
  '80001': {
    exchange: '0x4fb72262344034e034fce3d9c701fd9213a55260',
    wrappedNativeToken: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
  },
  '43114': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
  },
  '42161': {
    exchange: '0xdef1abe32c034e558cdd535791643c58a13acc10',
    wrappedNativeToken: '',
  },
}

export { addresses }
