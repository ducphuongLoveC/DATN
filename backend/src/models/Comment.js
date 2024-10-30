import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    content: {
      type: String,
      maxlength: 255,
      required: true,
    },

    commentable_type: {
      type: String,
      enum: ["post", "resource"], // Chỉ nhận giá trị 'post' hoặc 'resource'
      required: true,
    },
    commentable: {
      type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến post hoặc resource
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Comment", commentSchema);
