import { Router } from "express";
import routerCourse from "./courses.js";
import routerAuth from "./auth.js";
import routerLearningPath from "./learningPath.js";
import routerLearningOutcomes from "./learningOutcomes.js";
import routerCertificate from "./certificate.js";
import routerAccess from "./access.js";
import routerUser from "./user.js";
import routerModule from "./module.js";
const router = Router();

router.use('/courses',routerCourse);
router.use('/auth', routerAuth);
router.use('/learning-path', routerLearningPath);
router.use('/learning-outcomes', routerLearningOutcomes);
router.use('/certificate', routerCertificate);
router.use('/access', routerAccess);
router.use('/user', routerUser);
router.use('/module', routerModule);


export default router;