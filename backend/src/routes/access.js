import { Router } from "express";
import AccessController from "../controllers/AccessController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { accessSchema } from "../validSchema/accessSchema.js";

const routerAccess = Router();
// Route để lấy tất cả các bản ghi truy cập
routerAccess.get("/user/:userId", AccessController.getAccessByUser);

// Route để tạo một bản ghi truy cập mới
routerAccess.post("/", AccessController.createAccess);
// Route để cập nhật ngày hết hạn của một bản ghi truy cập cụ thể
routerAccess.patch(
  "/:accessId",
  validBodyRequets(accessSchema),
  AccessController.updateAccess
);
// Route để xoá một bản ghi truy cập
routerAccess.delete("/:accessId", AccessController.deleteAccess);
// Route để kiểm tra xem người dùng có quyền truy cập vào một khoá học hay không
routerAccess.get("/check/:userId/:courseId", AccessController.hasAccess);

export default routerAccess;
