import Message from '../models/Message.js';
import User from '../models/user.js';
import wsService from '../services/websocket.js';

// Send a message (e.g., from admin to user)
export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const sender = req.user.id; // Assuming the sender is the logged-in user (admin or user)

    // Create the message
    const newMessage = await Message.create({
      sender,
      receiver, 
      message 
    });

    // Get sender details
    const senderDetails = await User.findById(sender);

    // Send real-time notification to receiver
    wsService.sendNotification(receiver, {
      id: newMessage._id.toString(),
      senderName: senderDetails.name,
      message,
      timestamp: newMessage.createdAt
    });

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
};

// Get all messages for a user
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the logged-in user is the sender or receiver
    console.log("Fetching messages for user ID:", userId);

    const messages = await Message.find({
      $or: [
        { sender: userId }, // Messages where the user is the sender
        { receiver: userId }, // Messages where the user is the receiver
      ],
    }).sort({ createdAt: -1 });

    console.log("Messages found:", messages); 

    res.status(200).json({ data: messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
};

// Get messages for a conversation
export const getConversationMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'name')
    .populate('receiver', 'name');

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// Get all conversations for current user
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all messages where user is either sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'name')
    .populate('receiver', 'name');

    // Group messages by conversation
    const conversations = messages.reduce((acc, message) => {
      const otherUser = message.sender._id.toString() === userId 
        ? message.receiver 
        : message.sender;
      
      const conversationId = otherUser._id.toString();
      
      if (!acc[conversationId]) {
        acc[conversationId] = {
          user: otherUser,
          lastMessage: message,
          unreadCount: message.sender._id.toString() !== userId && !message.read ? 1 : 0
        };
      } else if (message.sender._id.toString() !== userId && !message.read) {
        acc[conversationId].unreadCount++;
      }
      
      return acc;
    }, {});

    res.json(Object.values(conversations));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Error fetching conversations' });
  }
};

// Mark a message as read
export const markAsRead = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message marked as read", data: message });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark message as read", details: err.message });
  }
};

// Mark messages as read
export const markConversationAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    await Message.updateMany(
      { 
        sender: conversationId, 
        receiver: userId,
        read: false
      },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Error marking messages as read' });
  }
};

export default {
  sendMessage,
  getMessages,
  getConversationMessages,
  getConversations,
  markAsRead,
  markConversationAsRead
};