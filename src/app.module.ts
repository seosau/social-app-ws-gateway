import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { BullModule } from '@nestjs/bullmq';
import { bullMQConfig, queueAsyncConfig } from './configs/bullMQ.config';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BullModule.forRootAsync(bullMQConfig),
    BullModule.registerQueueAsync(queueAsyncConfig),
    NotificationModule,
    ChatModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
