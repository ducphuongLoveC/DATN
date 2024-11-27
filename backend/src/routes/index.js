import { Router } from "express";
import routerCourse from "./courses.js";
import routerAuth from "./auth.js";
import routerLearningPath from "./learningPath.js";
import routerCertificate from "./certificate.js";
import routerAccess from "./access.js";
import routerUser from "./user.js";
import routerModule from "./module.js";
import routerResource from "./resource.js";
import routerCaptcha from "./captcha.js";
import routerPayment from "./payment.js";
import routerOrder from "./order.js";
import routerProgress from "./progress.js";
import routerComment from "./comment.js";
import routerCourseLearningPath from "./courseLearningPath.js";
import routerNotification from "./notification.js";
import routerCloudinary from "./cloudinary.js";
const router = Router();

router.use("/courses", routerCourse);
router.use("/auth", routerAuth);
router.use("/learning-path", routerLearningPath);
router.use("/certificate", routerCertificate);
router.use("/access", routerAccess);
router.use("/user", routerUser);
router.use("/module", routerModule);
router.use("/resource", routerResource);
router.use("/captcha", routerCaptcha);
router.use("/payment", routerPayment);
router.use("/order", routerOrder);
router.use("/progress", routerProgress);
router.use("/comment", routerComment);
router.use("/course-learning-path", routerCourseLearningPath);
router.use("/notification", routerNotification);
router.use("/media", routerCloudinary);

export default router;
