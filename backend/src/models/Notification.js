import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    title: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: [true, "Title is required"],
    },

    content: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: [true, "Content is required"],
    },

    type: {
      type: String,
      enum: ["course update", "comment reply", "like"],
      required: true,
    },

    is_read: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Notification", notificationSchema);
