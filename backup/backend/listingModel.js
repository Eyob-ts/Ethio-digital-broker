import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Car", "House"],
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Car-specific fields
    condition: { type: String, enum: ["New", "Used"] },
    model: { type: String },
    year: { type: Number },
    fuel: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"] },
    transmission: { type: String, enum: ["Manual", "Automatic"] },
    // House-specific fields
    price: { type: Number, min: 0 },
    location: { type: String },
    type: { type: String, enum: ["Apartment", "Villa", "Commercial"] },
    status: { type: String, enum: ["Available", "Sold", "Pending"] },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

export default mongoose.model("Listing", ListingSchema);
