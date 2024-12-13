import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import upload from "../middlewares/multer.js";

const routerUser = Router();

routerUser.get("/", UserController.get);
routerUser.put("/users/:id", upload, UserController.updateUser);
routerUser.get("/:id", UserController.getUserById);
routerUser.get("/:id/courses", UserController.getUserCourses);
routerUser.put("/update-password",checkAuth, UserController.changePassword)
routerUser.put("/change-password", checkAuth, UserController.changePassword);


export default routerUser;
