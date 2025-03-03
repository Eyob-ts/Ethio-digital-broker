import mongoose from "mongoose";

// Listing Schema
const ListingSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Car", "House"], // Enum values for listing categories
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0 },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
    // Car-specific fields
    condition: { type: String, enum: ["New", "Used"] },
    model: { type: String },
    year: { type: Number },
    fuel: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"] },
    transmission: { type: String, enum: ["Manual", "Automatic"] },
    // House-specific fields
    location: { type: String },
    type: { type: String, enum: ["Apartment", "Villa", "Commercial"] },

    // Listing Type (Rent or Sell)
    listingType: {
      type: String,
      enum: ["Rent", "Sell"],
      required: false, // The listing must have a type of either Rent or Sell
    },

    status: {
      type: String,
      enum: ["Pending", "approved", "rejected"],
      default: "Pending",
      // Default value is "Pending" when created 
    },
     // Add verificationDocuments field
     verificationDocuments: [
      {
        public_id: { type: String, required: true }, // Cloudinary public ID
        url: { type: String, required: true },       // Cloudinary URL
      },
    ],

   
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Create and export Listing model
export default mongoose.model("Listing", ListingSchema);  