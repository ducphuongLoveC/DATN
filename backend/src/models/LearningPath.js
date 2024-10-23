import mongoose, { Schema } from "mongoose";

const learningPathSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Learning_path is required"],
      minlength: 6,
      maxlength: 30,
    },

    thumbnail: {
      type: String,
      required: [true, "Thubnail is required"],
      maxlength: 255,
    },

    description: {
      type: String,
      maxlength: 255,
    },

    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("LearningPath", learningPathSchema);
