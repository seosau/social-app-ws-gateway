import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { ChatGateway } from "./chat.gateway";
import { APP_CONFIG } from "src/configs/app.config";

@Processor('APP_CONFIG.QUEUE_CHAT_NAME')
export class ChatBullProcessor extends WorkerHost {

    constructor(
        private readonly chatGateway: ChatGateway
    ) {
        super()
    }

    async process(job: Job, token?: string): Promise<any> {
        console.log('9999999999999999988888888889 ', job.data);
        if(job.name === APP_CONFIG.QUEUE_CHAT_NAME_SEND_MESSAGE) {
            console.log('been trong ifffff ', job.data);
            // return this.notifService.updateNotifByUser(job.data as IUser)
            return this.chatGateway.sendMessageToUser(job.data.message.senderId, job.data)

        }
    }
}