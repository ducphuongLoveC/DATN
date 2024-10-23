import { Router } from "express";
import CoursesController from "../controllers/CoursesController.js";

const routerCourse = Router();
routerCourse.post('/', CoursesController.create);
routerCourse.get('/', CoursesController.get);
routerCourse.get('/:id', CoursesController.getDetail);
routerCourse.delete('/:id', CoursesController.detete);
routerCourse.patch('/:id', CoursesController.update);
export default routerCourse;