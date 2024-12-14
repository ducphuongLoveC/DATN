import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Carousel", carouselSchema);
