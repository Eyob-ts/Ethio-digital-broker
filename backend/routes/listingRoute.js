// /**
//  * @swagger
//  * tags:
//  *   name: Listings
//  *   description: API for managing property and car listings
//  */

// import express from "express";
// import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
// import { uploadFiles } from "../middleware/fileUpload.js";
// import {
//   addReview,
//   createListing,
//   deleteListing,
//   getListingById,
//   filterListings,
//   getListingsByUserId,
//   getMyListings,
//   getReceivedReviews,
//   getReviewsForListing,
//   getVerifyOwner,
//   searchFilterListings,
//   searchListings,
//   updateListing,
//   verifyOwner,
// } from "../controllers/Listing.js";

// const router = express.Router();

// /**
//  * @swagger
//  * /api/listings/filter:
//  *   get:
//  *     summary: Get filtered listings
//  *     tags: [Listings]
//  *     responses:
//  *       200:
//  *         description: A list of filtered listings
//  */
// router.get("/filter", filterListings);

// /**
//  * @swagger
//  * /api/listings/getbyid/{listingId}:
//  *   get:
//  *     summary: Get a listing by ID
//  *     tags: [Listings]
//  *     parameters:
//  *       - in: path
//  *         name: listingId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Listing details
//  */
// router.get("/getbyid/:listingId", getListingById);

// router.get("/search", searchListings);
// router.get("/search-filter", searchFilterListings);
// router.post("/:listingId/reviews", authenticate, addReview);
// router.get("/:listingId/reviews", authenticate, getReviewsForListing);
// router.get("/users/:userId/listings", authenticate, getListingsByUserId);
// router.get("/users/:userId/received-reviews", authenticate, getReceivedReviews);

// // Protected routes
// router.use(authenticate);

// /**
//  * @swagger
//  * /api/listings:
//  *   post:
//  *     summary: Create a new listing
//  *     tags: [Listings]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               images:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: binary
//  *     responses:
//  *       201:
//  *         description: Listing created successfully
//  */
// router.post("/", uploadFiles, createListing);

// router.post("/verifyOwner/:listingId", uploadFiles, verifyOwner);
// router.get("/verify-owner/:listingId", authenticate, authorizeAdmin, getVerifyOwner);
// router.get("/my-listing", authenticate, getMyListings);
// router.put("/updatelist/:listingId", authenticate, updateListing);
// router.delete("/deletelist/:listingId", authenticate, deleteListing);

// export default router;


import express from 'express';
import User from '../models/user.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { uploadFiles} from '../middleware/fileUpload.js';
import {
  
  addReview,
  createListing,
  deleteListing,
  getListingById,
  filterListings,
  getListingsByUserId,
  getMyListings,
  getReceivedReviews,
  getReviewsForListing,
  getVerifyOwner,
  searchFilterListings,
 searchListings,
  updateListing,
  verifyOwner
} from '../controllers/Listing.js';


const router = express.Router();
 
// Public routes
router.get('/filter', filterListings);
router.get("/getbyid/:listingId", getListingById); 
router.get('/search', searchListings);
router.get('/search-filter', searchFilterListings);
router.post("/:listingId/reviews", authenticate, addReview);
router.get("/:listingId/reviews", authenticate, getReviewsForListing);
router.get("/users/:userId/listings", authenticate, getListingsByUserId);

router.get("/users/:userId/received-reviews", authenticate, getReceivedReviews);

// Protected routes   
router.use(authenticate);    
router.post('/', uploadFiles, createListing);
router.post("/verifyOwner/:listingId", uploadFiles, verifyOwner);
router.get("/verify-owner/:listingId",authenticate,authorizeAdmin,getVerifyOwner)
router.get("/my-listing",authenticate, getMyListings);    
  
router.put("/updatelist/:listingId",authenticate, updateListing); 
router.delete('/deletelist/:listingId',authenticate, deleteListing);
   



export default router;        