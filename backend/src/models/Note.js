import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    resource_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: [true, "ResourceId is required"],
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

    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 6,
      maxlength: 255,
    },

    markAt: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Note", noteSchema);
