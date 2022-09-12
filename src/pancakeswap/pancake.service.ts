import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import { IPostRoutes, IResponse } from './pancake.interface';
import { SwapProviders, Web3Providers } from '../constants';
import { ChainId } from '../constants/types';

@Injectable()
export class PancakeService implements OnModuleInit {
  private readonly logger = new Logger(PancakeService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async onModuleInit() {
    this.logger.log(`${this.configService.get('NETWORK')}`);
  }

  buildGetAmountsOutTx(
    web3: Web3,
    amountRaw: string,
    from: string,
    to: string,
    toAmount: boolean,
  ): string {
    const path = [from, to];

    const amount = Math.floor(Number.parseFloat(amountRaw));
    const selector = toAmount ? '0x1f00ca74' : '0xd06ca61f';
    const data = web3.eth.abi.encodeParameters(
      ['uint256', 'address[]'],
      [amount, path],
    );
    return selector + data.substring(2);
  }

  async getRoutes(req: IPostRoutes): Promise<IResponse> {
    const web3 = Web3Providers[ChainId.BSC_CHAIN_ID].web3;

    const isToAmount = !!req.toAmount;

    const txData = this.buildGetAmountsOutTx(
      web3,
      isToAmount ? req.toAmount : req.fromAmount,
      req.from,
      req.to,
      isToAmount,
    );

    const rawRes = await web3.eth.call({
      to: SwapProviders[ChainId.BSC_CHAIN_ID].contractAddress,
      data: txData,
    });
    const res = web3.eth.abi.decodeParameters(['uint256[]'], rawRes)[0];
    const routeId = uuidv4();

    const data = {
      routeId,
      fromAmount: this.formatNumber(isToAmount, res[0]),
      toAmount: this.formatNumber(isToAmount, res[1]),
    };

    const routeResponse = {
      success: true,
      data,
    };
    await this.cacheManager.set(routeId, JSON.stringify(data), { ttl: 3600 });
    return routeResponse;
  }

  formatNumber(isToAmount, num) {
    return isToAmount
      ? Math.floor(Number.parseFloat(num)).toFixed(6).toString()
      : Math.ceil(Number.parseFloat(num)).toFixed(6).toString();
  }
}
