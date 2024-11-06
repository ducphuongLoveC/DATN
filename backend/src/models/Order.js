import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "CourseId is required"],
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "canceled"],
      default: "pending",
      required: true,
    },

    payment_method: {
      type: String,
      maxlength: 255,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", orderSchema);
