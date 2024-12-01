import mongoose from "mongoose";
import User from "../models/User.js";
import Access from "../models/Access.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";
import Progress from "../models/Progress.js";

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

      // Kiểm tra ID người dùng
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "ID người dùng không hợp lệ.",
        });
      }

      // Kiểm tra xem người dùng có tồn tại không
      const userExists = await User.findById(id).lean();
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "Người dùng không tồn tại.",
        });
      }

      // Lấy danh sách khóa học từ bảng Access
      const accessRecords = await Access.find({ user_id: id })
        .populate(
          "course_id", // Liên kết tới bảng Course
          "title level thumbnail description" // Các trường cần lấy từ Course
        )
        .lean();

      // Nếu không tìm thấy bất kỳ khóa học nào
      if (accessRecords.length === 0) {
        return res.status(200).json({
          success: true,
          totalCourses: 0,
          courses: [],
          message: "Người dùng chưa truy cập bất kỳ khóa học nào.",
        });
      }

      // Tính toán tiến độ cho mỗi khóa học
      const coursesWithProgress = await Promise.all(
        accessRecords.map(async (access) => {
          const courseId = access.course_id._id;

          // Lấy tất cả các module thuộc khóa học
          const modules = await Module.find({ course_id: courseId });
          const moduleIds = modules.map((module) => module._id);

          // Lấy tất cả tài nguyên thuộc các module
          const resources = await Resource.find({
            module_id: { $in: moduleIds },
          });
          const resourceIds = resources.map((resource) => resource._id);

          // Lấy tiến độ của người dùng trên các tài nguyên
          const progresses = await Progress.find({
            user_id: id,
            resource_id: { $in: resourceIds },
          });

          // Tính toán số tài nguyên đã hoàn thành
          const completedResources = progresses.filter(
            (progress) => progress.is_completed
          ).length;
          const totalResources = resourceIds.length;
          const progressPercentage =
            totalResources > 0
              ? ((completedResources / totalResources) * 100).toFixed(2)
              : 0;

          return {
            title: access.course_id.title,
            level: access.course_id.level,
            thumbnail: access.course_id.thumbnail,
            description: access.course_id.description,
            progress: progressPercentage,
          };
        })
      );

      // Trả về danh sách khóa học cùng tiến độ
      return res.status(200).json({
        success: true,
        userId: id,
        totalCourses: coursesWithProgress.length,
        courses: coursesWithProgress,
        message: "Lấy danh sách khóa học người dùng thành công.",
      });
    } catch (error) {
      console.error("Error fetching user courses:", error);
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi trong quá trình xử lý.",
        error: error.message,
      });
    }
  }
}

export default new UserController();
