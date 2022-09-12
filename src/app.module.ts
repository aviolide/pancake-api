import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PancakeModule } from './pancakeswap/pancake.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PancakeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
