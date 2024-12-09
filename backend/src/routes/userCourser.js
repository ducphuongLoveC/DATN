import { Router } from "express";
import UserCourseController from "../controllers/UserCourseController.js";

const routerUserCourse = Router();
routerUserCourse.post("/", UserCourseController.createOrUpdateUserCourse);
export default routerUserCourse;
