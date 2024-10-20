import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "PostId is required"],
    },

    tag_id: {
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
