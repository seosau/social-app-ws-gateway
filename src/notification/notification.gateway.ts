import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
// import { NotificationService } from './notification.service';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  // cors: {
  //   origin: '*', // Adjust based on your frontend URL
  // },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly config: ConfigService,
  ) {}

  private client = new Map<string, Socket>()

  // constructor(private readonly notificationService: NotificationService) {}

  // @SubscribeMessage('createNotification')
  // create(@MessageBody() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  // @SubscribeMessage('findAllNotification')
  // findAll() {
  //   return this.notificationService.findAll();
  // }

  // @SubscribeMessage('findOneNotification')
  // findOne(@MessageBody() id: number) {
  //   return this.notificationService.findOne(id);
  // }

  // @SubscribeMessage('updateNotification')
  // update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationService.update(updateNotificationDto.id, updateNotificationDto);
  // }

  // @SubscribeMessage('removeNotification')
  // remove(@MessageBody() id: number) {
  //   return this.notificationService.remove(id);
  // }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string

    console.log('User ID to connect: ', userId)
    this.client.set(userId, client);
  }

  sendNotificationToUser(userId: string, payload: any) {
    const socket = this.client.get(userId);

    console.log('send job: =====================, ', payload)
    if(socket) {
      console.log('Have connection')
      socket.emit(this.config.get('WEBSOCKET_NOTIFICATION_NAME'), payload)
    }
  }

  @SubscribeMessage('subscribeToNotifications')
  handleSubscribe(client: any, payload: any) {
    // You can implement custom subscription logic here
    return { event: 'subscribed', data: { message: 'Subscribed to notifications' } };
  }
}
