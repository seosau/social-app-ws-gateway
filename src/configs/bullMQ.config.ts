import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterQueueAsyncOptions, RegisterQueueOptions, SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { QUEUE_CHAT_NAME } from '../chat/chat.bull.constants';

export const bullMQConfig: SharedBullAsyncConfiguration = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
        const connectData = {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
            password: config.get<string>('REDIS_PASSWORD'),
            username: config.get<string>('REDIS_USERNAME'),
            // tls: {},
            maxRetriesPerRequest: null,
        }
        console.log(connectData)
        return {
            connection: connectData
        }
    }
}

export const queueAsyncConfig: RegisterQueueAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (consfigService: ConfigService) => ({
    name: consfigService.get('QUEUE_NOTIFICATION_NAME'),
  })
}

export const chatQueueConfig: RegisterQueueOptions = {
  name: QUEUE_CHAT_NAME,
}