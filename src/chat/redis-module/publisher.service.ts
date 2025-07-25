import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class PublisherService {
  constructor(@Inject('REDIS_PUBLISHER') private readonly redisPub: Redis) {}

  async publishEvent(userId: string, data: any) {
    await this.redisPub.publish('chat-events', JSON.stringify({ userId, data }));
  }
}
