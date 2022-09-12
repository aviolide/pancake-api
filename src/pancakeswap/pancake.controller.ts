import {
  CacheInterceptor,
  Controller,
  Post,
  Logger,
  UseInterceptors,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { PancakeService } from './pancake.service';
import { Body } from '@nestjs/common';
import { IPostRoutes } from './pancake.interface';

@Controller('api')
@UseInterceptors(CacheInterceptor)
export class PancakeController {
  private readonly logger = new Logger(PancakeService.name);

  constructor(private readonly PancakeSwapService: PancakeService) {}

  @Post('routes')
  async getPancakeSwapRoutes(@Body() data: IPostRoutes) {
    try {
      const route = await this.PancakeSwapService.getRoutes(data);
      return route;
    } catch (e) {
      throw new NotFoundException({
        success: false,
        error: 'Direct pair not found',
      });
    }
  }
}
