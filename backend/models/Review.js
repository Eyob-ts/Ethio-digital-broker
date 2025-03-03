
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing", // Reference to the Listing model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
    comment: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Review", reviewSchema);