import CourseLearningPath from "../models/CourseLearningPath.js";

class CourseLearningPathController {
  getCoursesByLearningPathId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const courseLearningPaths = await CourseLearningPath.find({
        learningPath_id: id,
      })
        .populate("course_id")
        .populate("learningPath_id", "name description");

      if (!courseLearningPaths || courseLearningPaths.length === 0) {
        return res
          .status(404)
          .json({ message: "No courses found for this learning path." });
      }

      const courses = courseLearningPaths.map((clp) => clp.course_id);

      res.status(200).json({
        learningPath: courseLearningPaths[0].learningPath_id,
        courses,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new CourseLearningPathController();
