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

    learning_outcomes: [String],

    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      maxlength: 255,
    },

    description: {
      type: String,
      maxlength: 25000,
    },

    original_price: {
      type: Number,
      required: [true, "original_price is required"],
      min: 1,
    },
    sale_price: {
      type: Number,
      required: [true, "sale_price is required"],
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Course", courseSchema);