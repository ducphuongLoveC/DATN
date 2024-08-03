import { Router } from "express";
import CoursesController from '../controllers/CoursesController.js'
const router = Router();

router.use('/courses',CoursesController.getCourses);

export default router;