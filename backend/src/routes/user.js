import { Router } from "express";
import UserController from "../controllers/UserController.js";
import upload from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routerUser = Router();

// Lấy tất cả người dùng
routerUser.get("/", UserController.get);

// Cập nhật thông tin admin
routerUser.put("/users/:id", upload, UserController.updateUser);

// Lấy thông tin người dùng theo ID
routerUser.get("/:id", UserController.getUserById);

// Lấy danh sách khóa học người dùng
routerUser.get("/:id/courses", UserController.getUserCourses);

// Đổi mật khẩu 
routerUser.put("/change-password", checkAuth, UserController.changePassword);

export default routerUser;
