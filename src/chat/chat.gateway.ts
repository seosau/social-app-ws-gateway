import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly config: ConfigService,
  ) {}

  private client = new Map<string, Socket>()

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string

    console.log('User id to connect: ', userId)
    this.client.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.client.entries()].find(([, sock]) => sock.id === client.id)?.[0];
    if (userId) {
      this.client.delete(userId);
    }
  }

  sendMessageToUser(userId: string, payload: any) {
    const socket = this.client.get(userId);
      console.log('Checking is receiver online...')
    if (socket) {
      console.log('Receiver is online')
      socket.emit(this.config.get('WEBSOCKET_CHAT_NAME'), payload)
    }
  }

  @SubscribeMessage('chat::receiveMessage')
  handleSubcribeMessage() {
    return {
      event: 'subcribed',
      data: {
        message: 'Subcribed to receive message'
      }
    }
  }
}
