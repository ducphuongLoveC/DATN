import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import upload from "../middlewares/multer.js";

const routerUser = Router();

routerUser.get("/", UserController.get);
routerUser.get("/:id", UserController.getUserById);
routerUser.get("/:id/courses", UserController.getUserCourses);
routerUser.put("/change-password", checkAuth, UserController.changePassword);
routerUser.put("/reset-password", UserController.resetPassword);

routerUser.put("/:id", upload, UserController.updateUser);

export default routerUser;
