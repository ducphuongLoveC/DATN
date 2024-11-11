const mongoose = require("mongoose");

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
    isCompleted: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

progressSchema.index({ user_id: 1, resource_id: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);

