import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: [true, "ResourceId is required"],
    },

    question: {
      type: String,
      required: [true, "Question is required"],
      maxlength: 255,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Question", questionSchema);
