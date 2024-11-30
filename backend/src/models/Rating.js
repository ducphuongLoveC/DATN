import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "CourseId is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    stars: {
      type: Number,
      required: [true, "Stars are required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Rating", ratingSchema);
