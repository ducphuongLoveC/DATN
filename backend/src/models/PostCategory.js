import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: [true, "PostId is required"],
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: [true, "CategoryId is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("PostCategory", postCategorySchema);
