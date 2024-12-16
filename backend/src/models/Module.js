import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "CourseId is required"],
    },
    title: {
      type: String,
      default: "",
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      default: "not started",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Module", moduleSchema);
