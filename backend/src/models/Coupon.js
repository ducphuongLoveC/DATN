import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      maxlength: 220,
      required: [true, "Coupon code is required"],
    },
    course_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      required: [true, "Course ids are required"],
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed_amount"],
    },
    discount_value: {
      type: Number,
      required: [true, "Discount value is required"],
    },
    start_date: {
      type: Date,
      default: Date.now,
      required: [true, "Start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "End date is required"],
    },
    max_uses: {
      type: Number,
      required: [true, "Max uses is required"],
    },
    used_count: {
      type: Number,
      default: 0,
      required: true,
    },
    
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("coupon", couponSchema);
