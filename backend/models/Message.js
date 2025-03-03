import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin or User ID
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID
  message: { type: String, required: true },
  read: { type: Boolean, default: false }, // To track if the message has been read
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);