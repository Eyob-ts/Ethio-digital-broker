import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID
  amount: { type: Number, required: true }, // Transaction amount
  type: { type: String, enum: ["credit", "debit"], required: true }, // Credit or Debit
  description: { type: String, required: true }, // Description of the transaction
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema); 