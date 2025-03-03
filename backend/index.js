import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import connectDB from './config/ConnectDB.js';
import wsService from './services/websocket.js';

// Import routes
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
//import  swaggerDocs  from './swagger.js';

dotenv.config();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/listings", listingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("api/user",userRoutes)
//swaggerDocs(app);

// Start server 
connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // Initialize WebSocket server with CORS options
    wsService.initialize(server, corsOptions);
  });
}).catch((error) => {
  console.error("Failed to start the server:", error.message);
  process.exit(1);
});