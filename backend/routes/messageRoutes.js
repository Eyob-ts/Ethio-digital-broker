// Import necessary modules
import express from 'express';
import { 
  sendMessage, 
  getMessages, 
  getConversationMessages,
  getConversations,
  markAsRead,
  markConversationAsRead
} from '../controllers/messageController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Message routes 
router.post('/send',authenticate, sendMessage);  
router.get('/all', getMessages);
router.get('/conversations', getConversations);
router.get('/conversation/:userId', getConversationMessages);
router.put('/read/:messageId', markAsRead);
router.put('/conversation/read/:conversationId', markConversationAsRead);

export default router;