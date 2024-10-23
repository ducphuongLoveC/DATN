import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },

    course: {
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
      maxlength: 255,
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
