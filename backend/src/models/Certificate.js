import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    issue_date: { type: Date, default: Date.now },
    certificate_code: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Certificate", certificateSchema);
