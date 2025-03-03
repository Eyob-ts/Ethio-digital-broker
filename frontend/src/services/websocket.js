import { store } from '../redux/store';
import { addNotification } from '../redux/notificationSlice';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.baseReconnectDelay = 1000; // Start with 1 second
  }

  connect() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No auth token found, skipping WebSocket connection');
      return;
    }

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
    const url = `${wsUrl}/ws?token=${token}`;

    console.log('Attempting WebSocket connection to:', url);

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
      this.startPingInterval();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'notification':
            store.dispatch(addNotification(data));
            break;
          case 'pong':
            console.log('Received pong from server');
            break;
          case 'error':
            console.error('Received error from server:', data.message);
            break;
          case 'connection':
            console.log('Connection status:', data.message);
            break;
          default:
            console.log('Received unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log(`WebSocket Disconnected - Code: ${event.code}, Reason: ${event.reason}`);
      this.stopPingInterval();
      
      // Don't reconnect if the token is no longer valid
      if (!localStorage.getItem('authToken')) {
        console.log('No valid auth token, skipping reconnection');
        return;
      }
      
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = this.calculateReconnectDelay();
        console.log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts}) in ${delay}ms`);
        
        this.reconnectTimeout = setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, delay);
      } else {
        console.log('Max reconnection attempts reached. Please refresh the page to try again.');
      }
    };

    this.ws.onerror = (error) => {
      console.log('WebSocket Error:', error);
    };
  }

  calculateReconnectDelay() {
    // Exponential backoff with jitter
    const baseDelay = this.baseReconnectDelay;
    const exponentialDelay = baseDelay * Math.pow(2, this.reconnectAttempts);
    const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
    return Math.min(exponentialDelay + jitter, 30000); // Cap at 30 seconds
  }

  startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Send ping every 30 seconds
  }

  stopPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopPingInterval();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  // Send a message through the WebSocket connection
  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }
}

// Create singleton instance
const wsService = new WebSocketService();

export default wsService;
