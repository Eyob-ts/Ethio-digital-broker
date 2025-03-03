import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class WebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Map(); // Map to store client connections with their user IDs
  }

  initialize(server, corsOptions) {
    const wsOptions = {
      server,
      path: '/ws',
      verifyClient: (info, cb) => {
        try {
          // Get token from query string
          const url = new URL(info.req.url, `ws://${info.req.headers.host}`);
          const token = url.searchParams.get('token');

          if (!token) {
            cb(false, 401, 'Unauthorized: No token provided');
            return;
          }

          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          info.req.userId = decoded.id;

          // Handle CORS
          const origin = info.req.headers.origin;
          if (corsOptions.origin === '*' || corsOptions.origin === origin) {
            cb(true);
          } else if (typeof corsOptions.origin === 'string' && corsOptions.origin === origin) {
            cb(true);
          } else if (Array.isArray(corsOptions.origin) && corsOptions.origin.includes(origin)) {
            cb(true);
          } else {
            cb(false, 403, 'Forbidden: CORS policy');
          }
        } catch (error) {
          console.error('WebSocket authentication error:', error);
          cb(false, 401, 'Unauthorized: Invalid token');
        }
      }
    };

    this.wss = new WebSocketServer(wsOptions);

    this.wss.on('connection', async (ws, req) => {
      try {
        const userId = req.userId;
        
        // Store the connection with user ID
        this.clients.set(userId, ws);

        console.log(`WebSocket client connected. User ID: ${userId}`);

        // Handle incoming messages
        ws.on('message', async (message) => {
          try {
            const data = JSON.parse(message);
            
            switch (data.type) {
              case 'ping':
                ws.send(JSON.stringify({ type: 'pong' }));
                break;
              default:
                console.log('Received unknown message type:', data.type);
            }
          } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: 'Failed to process message' 
            }));
          }
        });

        // Handle client disconnection
        ws.on('close', () => {
          console.log(`Client disconnected. User ID: ${userId}`);
          this.clients.delete(userId);
        });

        // Handle connection errors
        ws.on('error', (error) => {
          console.error(`WebSocket error for user ${userId}:`, error);
          this.clients.delete(userId);
        });

        // Send initial connection success message
        ws.send(JSON.stringify({ 
          type: 'connection', 
          status: 'success',
          message: 'Connected to WebSocket server'
        }));

      } catch (error) {
        console.error('WebSocket connection error:', error);
        ws.close(4002, 'Internal server error');
      }
    });

    console.log('WebSocket server initialized');
  }

  // Send notification to a specific user
  sendNotification(userId, notification) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'notification',
        ...notification
      }));
    }
  }

  // Send notification to multiple users
  broadcastNotification(userIds, notification) {
    userIds.forEach(userId => {
      this.sendNotification(userId, notification);
    });
  }

  // Close all connections
  closeAll() {
    if (this.wss) {
      this.wss.clients.forEach(client => {
        client.close();
      });
    }
  }
}

// Create singleton instance
const wsService = new WebSocketService();

export default wsService;
