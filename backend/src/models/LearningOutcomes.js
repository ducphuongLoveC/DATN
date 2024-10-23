import mongoose from "mongoose";

const learningOutcomesSchema = new mongoose.Schema(
  {
    course: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }],

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
