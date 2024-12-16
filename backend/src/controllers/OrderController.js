import Order from "../models/Order.js";
import axios from "axios";
import { BASE_URL } from "../utils/env.js";

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { user_id, course_id, payment_method, amount, code, email } =
        req.body;

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
        await Order.deleteOne({ _id: existingOrder._id });
        console.log("Deleted existing order:", existingOrder._id);
      }

      const newOrder = new Order({
        user_id,
        course_id,
        payment_method,
        amount,
        status: "pending",
      });
      const savedOrder = await newOrder.save();
      console.log("Order saved:", savedOrder);

      const paymentResponse = await axios.post(`${BASE_URL}/api/payment`, {
        user_id,
        course_id,
        amount,
        order_id: savedOrder._id,
        code,
        email,
      });

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

  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find({ status: "completed" })
        .populate("user_id")
        .populate("course_id");
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

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

  // Lấy ra tất cả lịch sử giao dịch

  async Transactionhistory(req, res, next) {
    try {
      const {
        minPrice,
        maxPrice,
        sortPrice, // 'asc' hoặc 'desc' để sắp xếp theo giá
        searchId, // Tìm kiếm theo ID đơn hàng
      } = req.query;
  
      // Xây dựng query filter
      let query = Order.find();
  
      // Thêm điều kiện lọc theo giá
      if (minPrice || maxPrice) {
        let priceFilter = {};
        if (minPrice) priceFilter["$gte"] = parseFloat(minPrice);
        if (maxPrice) priceFilter["$lte"] = parseFloat(maxPrice);
  
        query = query.where("amount", priceFilter);
      }
  
      // Thêm điều kiện tìm kiếm theo ID đơn hàng
      if (searchId) {
        query = query.where("_id").equals(searchId);
      }
  
      // Thêm populate
      query = query.populate("user_id").populate("course_id");
  
      // Thêm sắp xếp theo giá nếu có
      if (sortPrice) {
        query = query.sort({
          amount: sortPrice === "desc" ? -1 : 1,
        });
      }
  
      const orders = await query;
  
      return res.status(200).json({
        success: true,
        total: orders.length,
        data: orders,
        message: "Lấy danh sách đơn hàng thành công",
      });
    } catch (error) {
      console.error("Error getting orders:", error);
      next(error);
    }
  }
  
}

export default new OrderController();
