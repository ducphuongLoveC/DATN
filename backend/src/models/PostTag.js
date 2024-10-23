import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "PostId is required"],
    },

    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: [true, "TagId is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("PostTag", postTagSchema);
