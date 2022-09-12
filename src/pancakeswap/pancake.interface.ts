import { ChainId } from '../constants/types';

export interface Tool {
  name: string;
  contractAddress: string;
}

export type TSwapProviders = {
  [key in ChainId]: Tool;
};

export interface IDataResponse {
  routeId: string;
  fromAmount: string;
  toAmount: string;
}

export interface IResponse {
  success: boolean;
  data?: IDataResponse;
  error?: string;
}

export interface IPostRoutes {
  from: string;
  to: string;
  toAmount?: string;
  fromAmount?: string;
}
