import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      maxlength: 100,
      required: [true, "Coupon code is required"],
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed_amount"],
    },
    discount_value: {
      type: Number,
    },
    start_date: {
      type: Date,
      default: Date.now,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    max_uses: {
      type: Number,
      required: true,
    },

    used_count: {
      type: Number,
      default: 0,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("coupon", couponSchema);
