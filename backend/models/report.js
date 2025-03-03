import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reportType: { type: String, required: true }, // Example: "fraud", "scam"
  description: { type: String, required: true },
  status: { type: String, default: "pending" }, // pending, resolved
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
 