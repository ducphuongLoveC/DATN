import { Router } from "express";
import routerCourse from "./courses.js";
import routerAuth from "./auth.js";
const router = Router();

router.use('/courses',routerCourse);
router.use('/auth', routerAuth)

export default router;