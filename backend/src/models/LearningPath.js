import mongoose, { Schema } from "mongoose";

const learningPathSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title là bắt buộc"],
      minlength: 3,
      maxlength: 30,
    },


    description: {
      type: String,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("LearningPath", learningPathSchema);
