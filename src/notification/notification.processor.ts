import { Processor, WorkerHost } from "@nestjs/bullmq";
import { NotificationGateway } from "./notification.gateway";
import { Job, Worker } from "bullmq";
import { ConfigService } from "@nestjs/config";
import { OnModuleInit } from "@nestjs/common";

const queueName = process.env.QUEUE_NOTIFICATION_NAME || 'notification'
console.log('=======================QUEEUEU NAME: ', process.env.QUEUE_NOTIFICATION_NAME)
@Processor(queueName)
export class NotificationProcessor extends WorkerHost{
    constructor(
        private readonly config: ConfigService,
        private readonly websocketGateway: NotificationGateway,
    ) {
        super();
    }
    
    async process(job: Job, token?: string): Promise<any> {
        const sendNotifWorkerInfor = {
            name: this.config.get('SEND_NOTIF_WORKER_NAME') || 'notification',
            jobName: this.config.get('SEND_NOTIF_JOB_NAME')
        }
        console.log('9999999999999999999999999999999: ', this.config.get('SEND_NOTIF_WORKER_NAME'))
        if(job.name === sendNotifWorkerInfor.jobName) {
            const { receiverId } = job.data
            console.log('Received job', job.data)
            this.websocketGateway.sendNotificationToUser(receiverId, job.data)
        }
    }
    // private sendNotifWorker: Worker
    // onModuleInit() {
    //     const connectData = {
    //         host: this.config.get('REDIS_HOST'),
    //         port: this.config.get<number>('REDIS_PORT'),
    //         password: this.config.get('REDIS_PASSWORD'),
    //         username: this.config.get('REDIS_USERNAME'),
    //         tls: {},
    //         maxRetriesPerRequest: null,
    //     }
    //     const sendNotifWorkerInfor = {
    //         name: this.config.get('SEND_NOTIF_WORKER_NAME') || 'notification',
    //         jobName: this.config.get('SEND_NOTIF_JOB_NAME')
    //     }

    //     this.sendNotifWorker = new Worker(
    //         sendNotifWorkerInfor.name,
    //         async (job: Job) => {
    //             if(job.name === sendNotifWorkerInfor.jobName) {
    //                 const { userId, postId, notifType, createdAt } = job.data
    //                 console.log('123456765432123456543', job.data)
    //                 this.websocketGateway.sendNotificationToUser(userId, job.data)
    //             }
    //         }
    //     )
    // }
}