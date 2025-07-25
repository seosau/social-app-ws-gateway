import { Global, Module } from "@nestjs/common";
import Redis from "ioredis";
import { APP_CONFIG } from "../../configs/app.config";

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_PUBLISHER',
            useFactory: async () => {
                return new Redis({
                    host: APP_CONFIG.REDIS_HOST,
                    port: APP_CONFIG.REDIS_PORT,
                    username: APP_CONFIG.REDIS_USERNAME,
                    password: APP_CONFIG.REDIS_PASSWORD
                })
            },
        },
        {
            provide: 'REDIS_SUBSCRIBER',
            useFactory: () => {
                return new Redis({
                    host: APP_CONFIG.REDIS_HOST,
                    port: APP_CONFIG.REDIS_PORT,
                    username: APP_CONFIG.REDIS_USERNAME,
                    password: APP_CONFIG.REDIS_PASSWORD,
                });
            },
        },
    ],
    exports: ['REDIS_PUBLISHER', 'REDIS_SUBSCRIBER'],
})

export class RedisModule { }