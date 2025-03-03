import express from "express";
import {  authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import {

  updateUserRole,
  updateUserStatus,
  exportUserData,
  notifyUser,
  getPhoneNumberById,
} from "../controllers/userController.js";

const router = express.Router();

// Admin-only routes

router.get("/:userId/phone",authenticate, getPhoneNumberById);
router.put("/:id/role", authorizeAdmin, updateUserRole);
router.put("/:id/status", authorizeAdmin, updateUserStatus);
router.get("/export", authorizeAdmin, exportUserData);
router.post("/:id/notify", authorizeAdmin, notifyUser);

export default router; 