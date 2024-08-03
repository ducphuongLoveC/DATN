import { Router } from "express";
import courseRouter from "./course.js";

const router = Router();
router.use('/course', courseRouter);
export default router;