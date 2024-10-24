import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "CourseId is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 6,
      maxlength: 255,
    },

    status: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      default: "not started",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Module", moduleSchema);
