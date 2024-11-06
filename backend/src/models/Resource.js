import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Module is required"],
    },

    resource_type: {
      type: String,
      // enum: ["video", "image", "document"],
      // default: "document",
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 6,
      maxlength: 255,
    },

    url: {
      type: String,
      // required: [true, "Url is required"],
      maxlength: 255,
    },

    description: {
      type: String,
      maxlength: 25000,
    },

    questions_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    duration: {
      type: Number,
      required: [true, "duration is required"],
      minlength: 1,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Resource", resourceSchema);
