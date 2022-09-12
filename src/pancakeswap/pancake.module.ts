import { CacheModule, Module } from '@nestjs/common';
import { PancakeController } from './pancake.controller';
import { PancakeService } from './pancake.service';

@Module({
  imports: [CacheModule.register({ ttl: 60 * 5 /*5mins*/ })],
  controllers: [PancakeController],
  providers: [PancakeService],
})
export class PancakeModule {}
