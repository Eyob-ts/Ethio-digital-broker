import express from "express";
import {
  getMetrics,
  getUserGrowth,
  getRecentActivities,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getListings,
  deleteListing,
  getListingById,
  getAdminReport,
  getVerifyOwner,
  editUserRole,
  banUser,
  updateVerificationStatus,
} from "../controllers/AdminController.js";
//import { exportUserData, GetUsers,  notifyUser, updateUserRole, updateUserStatus } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin dashboard routes
router.get("/metrics",authenticate,authorizeAdmin, getMetrics);
router.get("/user-growth",authenticate,authorizeAdmin, getUserGrowth);
router.get("/recent-activities",authenticate,authorizeAdmin, getRecentActivities);
router.get("/users",authenticate, getUsers);

router.get("/users/:userId",authenticate, getUserById);
router.put("/users/edit/:userId",authenticate, updateUser);
router.delete("/users/:userId",authenticate, deleteUser); 
router.get("/listings",authenticate, getListings);
router.get("/listings/:listingId",authenticate, getListingById);
router.get("/listings/:listingId/verify-owner", authenticate, getVerifyOwner);
router.put("/listings/:listingId/verify-owner/status", authenticate,authorizeAdmin, updateVerificationStatus);
 router.delete("/listings/:listingId",authenticate, deleteListing);

 //todo
 router.put("/:userId/role",authenticate,authorizeAdmin, editUserRole);
 router.put("/:userId/ban", authenticate,authorizeAdmin, banUser);
// router.get("/", authenticate,authorizeAdmin, GetUsers);
// router.put("/:id/role",authenticate,authorizeAdmin, updateUserRole);
// router.put("/:id/status", authenticate,authorizeAdmin, updateUserStatus);
// router.get("/export",authenticate, authorizeAdmin, exportUserData);
// router.post("/:id/notify", authenticate,authorizeAdmin, notifyUser);

router.get("/report", getAdminReport); 

export default router;