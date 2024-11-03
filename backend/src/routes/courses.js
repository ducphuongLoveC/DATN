import { Router } from "express";
import CoursesController from "../controllers/CoursesController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { courseSchema } from "../validSchema/courseSchema.js";

import upload from "../middlewares/multer.js";
const routerCourse = Router();

routerCourse.get("/", CoursesController.get);

routerCourse.get(
  "/modules-resources",
  CoursesController.getCoursesWithModulesAndResources
);
routerCourse.get(
  "/:id/modules-resources",
  CoursesController.getCourseWithModulesAndResources
);

routerCourse.get(
  "/modules-resources-user",
  CoursesController.getCoursesWithModulesAndResourcesUser
);
routerCourse.get(
  "/:id/modules-resources-user",
  CoursesController.getCourseWithModulesAndResourcesUser
);

routerCourse.post("/add-course", upload, CoursesController.addCourseDetail);

routerCourse.patch("/update-course/:id", CoursesController.updateCourseDetail);

routerCourse.get("/:id", CoursesController.getDetail);
routerCourse.post(
  "/",
  validBodyRequets(courseSchema),
  CoursesController.create
);
routerCourse.patch(
  "/:id",
  validBodyRequets(courseSchema),
  CoursesController.update
);
routerCourse.delete("/:id", CoursesController.detete);

export default routerCourse;
