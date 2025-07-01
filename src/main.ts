// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// async function bootstrap() {
//   try {
//     const app = await NestFactory.create(AppModule);
//     const server = createServer(app.getHttpAdapter().getInstance());

//     const io = new Server(server, {
//       cors: { origin: ['http://localhost:3010'] },
//       transports: ['websocket'],
//     });

//     io.on('connection', (socket) => {
//       const userId = socket.handshake.query.userId;
//       if (typeof userId === 'string' && userId) {
//         console.log('User connected:', userId);
//         socket.emit('notification', { message: `Hello ${userId}` });
//       } else {
//         socket.disconnect();
//       }

//       socket.on('disconnect', () => {
//         console.log('Disconnected');
//       });

//       socket.on('error', (err) => {
//         console.error('Socket error:', err);
//       });
//     });

//     const port =  4600;
//     await server.listen(port);
//     console.log(`Gateway is running on port ${port}`);
//   } catch (err) {
//     console.error('Failed to start gateway:', err);
//     process.exit(1);
//   }
// }
// bootstrap();


//=====================================================================================
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable WebSocket adapter for Socket.IO
//   app.useWebSocketAdapter(new IoAdapter(app));

//   // Enable CORS (adjust origin based on your frontend URL)
//   app.enableCors({
//     origin: '*', // Replace with your frontend URL in production
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   // Start the server
//   await app.listen(4600); // Adjust port as needed
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();
//=====================================================================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

class CustomIoAdapter extends IoAdapter {
  constructor(app) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const socketIoOptions: Partial<ServerOptions> = {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:3010'], // Match frontend URL(s)
        methods: ['GET', 'POST'],
        credentials: true,
      },
      path: '/socket.io', // Default Socket.IO path
      serveClient: false, // Set to false to avoid serving client files
    };

    return super.createIOServer(port, { ...options, ...socketIoOptions });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Explicitly enable CORS for the entire app (for HTTP requests)
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3010'], // Add your frontend URL(s)
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Apply custom Socket.IO adapter with options
  app.useWebSocketAdapter(new CustomIoAdapter(app));

  // Start the server
  await app.listen(4600);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();