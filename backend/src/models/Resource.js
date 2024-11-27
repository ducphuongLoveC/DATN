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
      // enum: ["video", "question"], // Giới hạn các loại tài nguyên
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 6,
      maxlength: 255,
    },

    thumbnail: {
      type: String,
      maxlength: 1000,
    },

    // Dành cho video
    url: {
      type: String,
      maxlength: 255,
    },

    duration: {
      type: Number,
      min: 0,
      max: 6000,
    },

    poster: {
      type: String,
      maxlength: 255,
    },

    // Dành cho quiz (question)
    questions: [
      {
        question: {
          type: String,
          required: [true, "Question is required"],
          maxlength: 255000,
        },
        correctAnswer: {
          type: String, // Correct answer could be a letter or index
          required: [true, "Correct answer is required"],
        },
        options: {
          type: Map,
          of: String,
          required: [true, "Options are required"],
        },
        hint: {
          type: String,
        },
      },
    ],

    description: {
      type: String,
      maxlength: 25000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Resource", resourceSchema);
