import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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

    completed: {
      type: Boolean,
      default: false,
    },

    completedPercentage: {
      type: Date,
      required: function () {
        return this.completed;
      },
    },

    progressPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Progress", progressSchema);
