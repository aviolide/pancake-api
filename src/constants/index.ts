import Web3 from 'web3';
import { Chain, ChainId } from './types';
import { Tool, TSwapProviders } from '../pancakeswap/pancake.interface';

const PancakeSwap: Tool = {
  name: 'PancakeSwap',
  contractAddress: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
};

export const SwapProviders: TSwapProviders = {
  [ChainId.BSC_CHAIN_ID]: PancakeSwap,
};

const ANKR_KEY =
  'dce37cea1ffb9eb5c392fa319b0d31e04630c2cacc7f12a66b2c846941705019';

export const Web3Providers = {
  [ChainId.BSC_CHAIN_ID]: new Chain(
    new Web3(`https://rpc.ankr.com/bsc/${ANKR_KEY}`),
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    ChainId.BSC_CHAIN_ID,
  ),
};
