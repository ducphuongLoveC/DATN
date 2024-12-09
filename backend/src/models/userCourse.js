import mongoose from "mongoose";

const userCourseSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["enrolled", "completed", "dropped"], 
      default: "enrolled",
    },
    total_time: {
      type: Number, 
      default: 0,
    },
    last_accessed: {
      type: Date, 
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("UserCourse", userCourseSchema);
