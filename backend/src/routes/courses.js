import { Router } from "express";
import CoursesController from "../controllers/CoursesController.js";

const routerCourse = Router();
routerCourse.get('/', CoursesController.get);
routerCourse.get('/:id', CoursesController.getDetail);
routerCourse.post('/', CoursesController.create);
routerCourse.delete('/:id', CoursesController.detete);
routerCourse.patch('/:id', CoursesController.update);
export default routerCourse;