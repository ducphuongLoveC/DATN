import { Router } from "express";
import CoursesController from "../controllers/CoursesController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { courseSchema } from "../validSchema/courseSchema.js";

import upload from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const routerCourse = Router();

routerCourse.get("/", CoursesController.get);
routerCourse.get("/with-user", CoursesController.getCoursesWithUser);
routerCourse.get("/single/:id", CoursesController.getById);

routerCourse.get(
  "/modules-resources",
  CoursesController.getCoursesWithModulesAndResources
);

routerCourse.get(
  "/:id/modules-resources",
  CoursesController.getCourseWithModulesAndResources
);

routerCourse.get("/:id/statistics", CoursesController.getCourseStatistics);

routerCourse.get(
  "/modules-resources-user",
  CoursesController.getCoursesWithModulesAndResourcesUser
);
routerCourse.get(
  "/:id/modules-resources-user",
  CoursesController.getCourseWithModulesAndResourcesUser
);

routerCourse.post("/add-course", upload, CoursesController.addCourseDetail);

routerCourse.patch(
  "/update-course/:id",
  upload,
  CoursesController.updateCourseDetail
);

routerCourse.get(
  "/:id/resource-ids",
  CoursesController.getResourcesIdByCourseId
);

routerCourse.delete("/:id", checkAuth, CoursesController.deleteCourseById);

export default routerCourse;
