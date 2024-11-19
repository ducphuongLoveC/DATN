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

export default router;
