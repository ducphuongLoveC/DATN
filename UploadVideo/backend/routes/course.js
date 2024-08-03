import { Router } from "express";
import CourseController from "../controllers/CourseController.js";
import upload from "../middleware/upload.js";


const courseRouter = Router();

courseRouter.get('/', CourseController.CourseList);
courseRouter.get('/:id', CourseController.getCourse);

courseRouter.post('/upload', upload.single('video'), CourseController.CourseUpload);

export default courseRouter;