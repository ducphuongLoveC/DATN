import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
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

    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: 255,
    },

    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);

// post_id
// user_id
// title
// content
// thumbnail
