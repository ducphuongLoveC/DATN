import { Router } from "express";
import CoursesController from "../controllers/CoursesController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { courseSchema } from "../validSchema/courseSchema.js";

const routerCourse = Router();
routerCourse.get('/', CoursesController.get);
routerCourse.get('/:id', CoursesController.getDetail);
routerCourse.post('/',validBodyRequets(courseSchema), CoursesController.create);
routerCourse.delete('/:id', CoursesController.detete);
routerCourse.patch('/:id',validBodyRequets(courseSchema), CoursesController.update);
export default routerCourse;