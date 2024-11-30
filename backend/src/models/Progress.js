import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resource_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    completion_date: {
      type: Date,
    },
    time_spent: {
      type: Number,
      default: 0,
    },
    is_unlocked: {
      type: Boolean,
      default: false,
    },
    last_accessed_at: {
      type: Date,
    },
    started_at: {
      type: Date,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Tạo chỉ mục duy nhất cho user_id và resource_id để đảm bảo mỗi người dùng chỉ có một tiến độ cho mỗi resource
progressSchema.index({ user_id: 1, resource_id: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
