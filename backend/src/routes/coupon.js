import { Router } from "express";
import CouponController from "../controllers/CouponController.js";

import { checkAuth } from "../middlewares/checkAuth.js";

const routerCoupon = Router();

routerCoupon.get("/", CouponController.getAllCoupons);
routerCoupon.post("/", CouponController.createCoupon);
routerCoupon.post("/apply-coupon", checkAuth, CouponController.applyCoupon);
routerCoupon.patch("/:id", CouponController.updateCoupon);
routerCoupon.delete("/:id", CouponController.deleteCoupon);
routerCoupon.get("/:id", CouponController.getCouponsByCourseId);

export default routerCoupon;
