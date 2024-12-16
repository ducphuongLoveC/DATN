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
      required: [true, "Tiêu đề là bắt buộc"],
      minlength: [1, "Tiêu đề tài liệu phải có ít nhất 6 ký tự"],
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
      default: 0,
      type: Number,
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
          default: "Câu hỏi:",

          maxlength: 255000,
        },
        correctAnswer: {
          type: String, // Correct answer could be a letter or index
          default: "A",
        },
        options: {
          type: Map,
          of: String,
          required: [true, "Options are required"],
        },
        hint: {
          type: String,
          default: "",
        },
      },
    ],

    description: {
      type: String,
      maxlength: 2500000,
      default: " ",
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
