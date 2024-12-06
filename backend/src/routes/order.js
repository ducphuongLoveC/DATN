import { Router } from "express";
import OrderController from "../controllers/OrderController.js";
import { checkAuth, checkRoles } from "../middlewares/checkAuth.js";

const routerOrder = Router();

// Tạo đơn hàng mới
routerOrder.post("/", OrderController.createOrder);
// Lấy danh sách đơn hàng
routerOrder.get("/", OrderController.getAllOrders);
// Lấy thông tin đơn hàng theo ID
routerOrder.get("/:id", OrderController.getOrderById);
// Cập nhật trạng thái đơn hàng
routerOrder.put("/:id/status", OrderController.updateOrderStatus);

routerOrder.use('/', checkAuth,  checkRoles(['admin']))
// Xóa đơn hàng
routerOrder.delete("/:id", OrderController.deleteOrder);

export default routerOrder;
