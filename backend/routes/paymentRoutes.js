import express from "express";
import {
  initializePayment,
  handlePaymentCallback,
  verifyPayment,
} from "../controllers/paymentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes with authentication middleware
router.use(authenticate);

// Initialize a payment
router.post("/initialize", initializePayment);

// Handle payment callback (this route should not be protected by authMiddleware)
router.post("/callback", handlePaymentCallback);

// Verify a payment
router.post("/verify", verifyPayment);  
 
export default router;  