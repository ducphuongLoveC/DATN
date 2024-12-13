import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const routerOrder = Router();

// Tạo đơn hàng mới
routerOrder.post("/", OrderController.createOrder);
// Lấy danh sách đơn hàng
routerOrder.get("/", OrderController.getAllOrders);
// Lấy ra tất cả lịch sử giao dịch
routerOrder.get("/transactionhistory", OrderController.Transactionhistory);
// Lấy thông tin đơn hàng theo ID
routerOrder.get("/:id", OrderController.getOrderById);
// Cập nhật trạng thái đơn hàng
routerOrder.put("/:id/status", OrderController.updateOrderStatus);
// Xóa đơn hàng
routerOrder.delete("/:id", OrderController.deleteOrder);

export default routerOrder;
