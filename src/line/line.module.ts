import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LineService } from './line.service';
import { LineProcessor } from './line.processor';
import { LineController } from './line.controller';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'dynamic',
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10),
        },
      }),
    }),
  ],
  controllers: [LineController],
  providers: [LineService, LineProcessor],
})
export class LineModule {}
