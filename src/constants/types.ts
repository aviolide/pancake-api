import Web3 from 'web3';

export enum ChainId {
  BSC_CHAIN_ID = 56,
}

export class Chain {
  chainId: ChainId;
  defaultWethAddress: string;
  web3: Web3;

  constructor(web3: Web3, defaultWethAddress: string, chainId: ChainId) {
    this.web3 = web3;
    this.chainId = chainId;
    this.defaultWethAddress = defaultWethAddress;
  }
}
