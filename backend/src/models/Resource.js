import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "CourseId is required"],
    },

    resource_type: {
      type: String,
      enum: ["video", "image", "document"],
      default: "document",
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 6,
      maxlength: 255,
    },

    url: {
      type: String,
      required: [true, "Url is required"],
      maxlength: 255,
    },

    description: {
      type: String,
      maxlength: 255,
    },

    questions_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    duration: {
      type: String,
      required: [true, "Duration is required"],
      minlength: 6,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Resource", resourceSchema);
