import Order from "../models/Order.js";
import axios from "axios";

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { user_id, course_id, payment_method, amount, code } = req.body;

      if (!user_id || !course_id || !payment_method || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Kiểm tra xem người dùng đã có đơn hàng chưa thanh toán hay không
      const existingOrder = await Order.findOne({
        user_id,
        course_id,
        status: "pending",
      });

      if (existingOrder) {
        // Xóa đơn hàng cũ
        await Order.deleteOne({ _id: existingOrder._id });
        console.log("Deleted existing order:", existingOrder._id);
      }

      // Tạo đơn hàng mới
      const newOrder = new Order({
        user_id,
        course_id,
        payment_method,
        amount,
        status: "pending",
      });
      const savedOrder = await newOrder.save();
      console.log("Order saved:", savedOrder);

      // Gọi API thanh toán
      const paymentResponse = await axios.post(
        `http://localhost:8000/api/payment`,
        {
          user_id,
          course_id,
          amount,
          order_id: savedOrder._id,
          code,
        }
      );

      console.log("Payment response:", paymentResponse.data);

      return res
        .status(201)
        .json({ order: savedOrder, payUrl: paymentResponse.data.payUrl });
    } catch (error) {
      console.error(
        "Error calling payment API:",
        error.response ? error.response.data : error.message
      );
      next(error);
    }
  }

  // Lấy danh sách đơn hàng
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find()
        .populate("user_id")
        .populate("course_id");
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // Lấy thông tin đơn hàng theo ID
  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id)
        .populate("user_id")
        .populate("course_id");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Kiểm tra nếu trạng thái không hợp lệ
      if (!["pending", "completed", "failed", "canceled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  // Xóa đơn hàng
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
