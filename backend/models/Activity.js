
import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

 
export default mongoose.model("Activity", activitySchema)
