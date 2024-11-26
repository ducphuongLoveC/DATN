import { Router } from "express";
import CourseLearningPathController from "../controllers/CourseLearningPathController.js";
// import { validBodyRequets } from "../middlewares/validbodyRequets.js";

const routerCourseLearningPath = Router();

// Lấy danh sách bình luận
routerCourseLearningPath.get(
  "/:id",
  CourseLearningPathController.getCoursesByLearningPathId
);

export default routerCourseLearningPath;
