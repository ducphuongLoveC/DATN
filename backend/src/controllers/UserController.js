import mongoose from "mongoose";
import Progress from "../models/Progress.js"; // Đảm bảo bạn import đúng model Progress
import Course from "../models/Course.js"; // Đảm bảo bạn import đúng model Course
import User from "../models/User.js";

class UserController {
  // Fetch all users
  async get(req, res, next) {
    try {
      const data = await User.find();
      return res.status(200).json({
        success: true,
        data,
        message: "Get successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Fetch user by ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "ID người dùng không hợp lệ.",
        });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Người dùng không tồn tại",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
        message: "Lấy thông tin người dùng thành công",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      next(error); // Chuyển lỗi cho middleware xử lý lỗi
    }
  }

  // Update user information
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, phone } = req.body; // Only update name and phone

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, phone },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Người dùng không tồn tại",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Cập nhật thông tin người dùng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserCourses(req, res, next) {
    try {
      const { id } = req.params;
      console.log("Received request for userId:", id); // Log userId từ request
  
      // Kiểm tra ID người dùng có hợp lệ không
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid user ID:", id); // Log nếu ID không hợp lệ
        return res.status(400).json({
          success: false,
          message: "ID người dùng không hợp lệ.",
        });
      }
  
      // Truy vấn bảng Progress để lấy các khóa học người dùng đã tham gia
      const progressRecords = await Progress.find({ user_id: id })
        .populate(
          "resource_id", // resource_id là khóa học trong bảng Progress
          "title level thumbnail description" // Các trường cần lấy từ bảng Course
        )
        .lean();
  
      console.log(
        "Progress records for userId:",
        id,
        "Progress:",
        progressRecords
      ); // Log các bản ghi tiến độ
  
      // Nếu không tìm thấy bất kỳ khóa học nào, trả về mảng trống và tổng khóa học là 0
      if (progressRecords.length === 0) {
        console.log("No courses found for userId:", id); // Log khi không tìm thấy khóa học
        return res.status(200).json({
          success: true,
          totalCourses: 0,
          courses: [], // Trả về mảng khóa học rỗng
          message: "Người dùng chưa đăng ký khóa học nào.",
        });
      }
  
      // Lấy danh sách khóa học từ các bản ghi trong bảng Progress
      const courses = progressRecords.map((progress) => progress.resource_id);
      console.log("Courses found for userId:", id, courses); // Log danh sách khóa học
  
      // Trả về kết quả
      return res.status(200).json({
        success: true,
        totalCourses: courses.length,
        courses: courses, // Trả về danh sách khóa học
        message: "Lấy danh sách khóa học người dùng thành công.",
      });
    } catch (error) {
      console.error("Error fetching user courses:", error); // Log lỗi khi có sự cố
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ. Vui lòng thử lại sau.",
        error: error.message,
      });
    }
  }
  
}

export default new UserController();
