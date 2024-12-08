import { Router } from "express";
import UserController from "../controllers/UserController.js";

const routerUser = Router();

// Lấy tất cả người dùng
routerUser.get("/", UserController.get);

// Cập nhật thông tin người dùng
routerUser.put("/users/:id", UserController.updateUser);

// Lấy thông tin người dùng theo ID
routerUser.get("/:id", UserController.getUserById);

// Lấy danh sách khóa học người dùng
routerUser.get("/:id/courses", UserController.getUserCourses);

routerUser.post("/change-password", UserController.changePassword)

export default routerUser;
