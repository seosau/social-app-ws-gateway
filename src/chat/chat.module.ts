import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatBullProcessor } from './chat.bull.processor';
import { BullModule } from '@nestjs/bullmq';
import { chatQueueConfig } from '../configs/bullMQ.config';
import { RedisModule } from './redis-module/redis.module';
import { SubscriberService } from './redis-module/subscriber.service';
import { PublisherService } from './redis-module/publisher.service';

@Module({
  imports: [
    // BullModule.registerQueue(chatQueueConfig),
    RedisModule,
  ],
  providers: [ChatGateway, ChatBullProcessor, PublisherService, SubscriberService],
})
export class ChatModule {}
