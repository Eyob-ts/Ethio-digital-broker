import express from "express"
import {authenticate} from "../Middleware/authMiddleware.js"
import  {getCustomerListings}  from "../controllers/customerController.js";

const router = express.Router()

router.get("/listings", authenticate, getCustomerListings);

export default router