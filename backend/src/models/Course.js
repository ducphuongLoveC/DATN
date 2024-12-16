import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 1,
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
      default: "",
      type: String,
      maxlength: 25000,
    },
    original_price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    has_certificate: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFree: {
      type: Boolean,
    },
    enrollment_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Course", courseSchema);
