import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    learning_path_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningPath",
      required: [true, "LearningPathId is required"],
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 6,
      maxlength: 255,
    },

    level: {
      type: String,
      enum: ["easy", "medium", "high"],
      default: "easy",
    },

    learningOutcomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningOutcomes",
        title: String,
      },
    ],

    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      maxlength: 255,
    },

    description: {
      type: String,
      maxlength: 255,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 1,
    },

    duration: {
      type: String,
      required: [true, "Duration is required"],
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Course", courseSchema);
