import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationProcessor } from './notification.processor';

@Module({
  providers: [NotificationGateway, NotificationProcessor],
})
export class NotificationModule {}
