import mongoose from "mongoose";
const courseLearningPathSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  learningPath_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LearningPath",
    required: true,
  },
});

  export default mongoose.model("CourseLearningPath", courseLearningPathSchema);
