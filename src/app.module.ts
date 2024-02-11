import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QUEUE } from './constants';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        }
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, QueueProcessor],
})
export class AppModule {}
