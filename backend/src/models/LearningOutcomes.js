import mongoose from "mongoose";

const learningOutcomesSchema = new mongoose.Schema(
  {
    course_id: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("LearningOutcomes", learningOutcomesSchema);
