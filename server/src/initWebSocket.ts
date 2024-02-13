import { Server as HttpServer} from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './env';
import { DatabaseQuery } from './database/queries/DatabaseQuery';

async function validateAccessToken(token) {
  if (!token) {
    console.error('no token provided');
  }

  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
  return decoded;
} 

export const initWebSocketServer = (server: HttpServer) => {
  let userConnections = new Map();

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', async (socket) => {
    
      const token = socket.handshake.query.token;

      const decoded = await validateAccessToken(token);
			console.log('A user connected');

      const user = await DatabaseQuery.findUserByIdFromDB(decoded.id);
			const isVerified = user?.is_verified || false;
      const userId = user?.id;
      console.log(isVerified);

      if (!userConnections.has(userId)) {
        userConnections.set(userId, []);
      }
      userConnections.get(userId).push(socket.id);

      socket.on('disconnect', () => {
        const index = userConnections.get(userId)?.indexOf(socket.id);
        if (index !== -1) {
          userConnections.get(userId).splice(index, 1);
        }
        console.log('A user disconnected');
      });

      if (isVerified) {
        socket.on('emailVerified', () => {
          console.log('Received emailVerified event from client');
          socket.emit('navigate', { verified: true });
          console.log('Sent navigate event to client');
        });
      }

      socket.on('emailVerified', () => {
  
        console.log('Email verification received');
        userConnections.get(userId)?.forEach((socketId) => {
          io.to(socketId).emit('navigate', { verified: true });
      });
      
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  });
}