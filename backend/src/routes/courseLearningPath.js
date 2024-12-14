import { Router } from "express";
import CourseLearningPathController from "../controllers/CourseLearningPathController.js";
// import { validBodyRequets } from "../middlewares/validbodyRequets.js";

const routerCourseLearningPath = Router();

routerCourseLearningPath.get(
  "/:id",
  CourseLearningPathController.getCoursesByLearningPathId
);

export default routerCourseLearningPath;
