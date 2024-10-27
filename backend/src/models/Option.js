import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "QuestionId is required"],
    },

    option: {
      type: String,
      required: [true, "Optiom is required"],
      maxlength: 255,
    },

    answer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Option", optionSchema);
