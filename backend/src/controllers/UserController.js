import mongoose from "mongoose";
import User from "../models/User.js";
import Access from "../models/Access.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";
import Progress from "../models/Progress.js";
import cloudinary from "cloudinary";
import fs from "fs";
import bcrypt from "bcryptjs";

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

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, phone, profile_picture } = req.body;

      let updatedUserData = { name, phone };

      // Find profile picture file from req.files array
      const profilePictureFile = req.files?.find(
        (file) => file.fieldname === "profile_picture"
      );

      if (profilePictureFile) {
        const uploadedProfilePicture = await cloudinary.v2.uploader.upload(
          profilePictureFile.path,
          { folder: "users" }
        );

        updatedUserData.profile_picture = uploadedProfilePicture.secure_url;

        // Xóa file tạm sau khi upload
        fs.unlink(profilePictureFile.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
          else console.log("Temp file deleted");
        });
      } else if (profile_picture) {
        // If no new file uploaded but profile_picture URL provided in body
        updatedUserData.profile_picture = profile_picture;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      next(error);
    }
  }

  // Đổi mật khẩu

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const userId = req.user._id; // Sửa từ req.user.id thành req.user._id

      // Kiểm tra các trường bắt buộc
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          message: "Vui lòng điền đầy đủ thông tin",
        });
      }

      // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
        });
      }

      // Kiểm tra độ dài mật khẩu mới
      if (newPassword.length < 6) {
        return res.status(400).json({
          message: "Mật khẩu mới phải có ít nhất 6 ký tự",
        });
      }

      // Tìm user trong database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy người dùng",
        });
      }

      // Kiểm tra mật khẩu hiện tại
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Mật khẩu hiện tại không đúng",
        });
      }

      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Cập nhật mật khẩu mới
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // async getUserCourses(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     // Kiểm tra ID người dùng
  //     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "ID người dùng không hợp lệ.",
  //       });
  //     }

  //     // Kiểm tra xem người dùng có tồn tại không
  //     const userExists = await User.findById(id).lean();
  //     if (!userExists) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Người dùng không tồn tại.",
  //       });
  //     }

  //     // Lấy danh sách khóa học từ bảng Access
  //     const accessRecords = await Access.find({ user_id: id })
  //       .populate(
  //         "course_id" // Liên kết tới bảng Course
  //       )
  //       .lean();

  //     // Nếu không tìm thấy bất kỳ khóa học nào
  //     if (accessRecords.length === 0) {
  //       return res.status(200).json({
  //         success: true,
  //         totalCourses: 0,
  //         courses: [],
  //         message: "Người dùng chưa truy cập bất kỳ khóa học nào.",
  //       });
  //     }

  //     // Tính toán tiến độ cho mỗi khóa học
  //     const coursesWithProgress = await Promise.all(
  //       accessRecords.map(async (access) => {
  //         const courseId = access.course_id._id;

  //         // Lấy tất cả các module thuộc khóa học
  //         const modules = await Module.find({ course_id: courseId });
  //         const moduleIds = modules.map((module) => module._id);

  //         // Lấy tất cả tài nguyên thuộc các module
  //         const resources = await Resource.find({
  //           module_id: { $in: moduleIds },
  //         });
  //         const resourceIds = resources.map((resource) => resource._id);

  //         // Lấy tiến độ của người dùng trên các tài nguyên
  //         const progresses = await Progress.find({
  //           user_id: id,
  //           resource_id: { $in: resourceIds },
  //         });

  //         // Tính toán số tài nguyên đã hoàn thành
  //         const completedResources = progresses.filter(
  //           (progress) => progress.is_completed
  //         ).length;
  //         const totalResources = resourceIds.length;
  //         const progressPercentage =
  //           totalResources > 0
  //             ? ((completedResources / totalResources) * 100).toFixed(2)
  //             : 0;

  //         return {
  //           _id: courseId,
  //           title: access.course_id.title,
  //           level: access.course_id.level,
  //           thumbnail: access.course_id.thumbnail,
  //           description: access.course_id.description,
  //           progress: parseInt(progressPercentage),
  //         };
  //       })
  //     );

  //     // Trả về danh sách khóa học cùng tiến độ
  //     return res.status(200).json({
  //       success: true,
  //       userId: id,
  //       totalCourses: coursesWithProgress.length,
  //       courses: coursesWithProgress,
  //       message: "Lấy danh sách khóa học người dùng thành công.",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user courses:", error);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Đã xảy ra lỗi trong quá trình xử lý.",
  //       error: error.message,
  //     });
  //   }
  // }

  // async getUserCourses(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     // Kiểm tra ID người dùng
  //     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "ID người dùng không hợp lệ.",
  //       });
  //     }

  //     // Kiểm tra xem người dùng có tồn tại không
  //     const userExists = await User.findById(id).lean();
  //     if (!userExists) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Người dùng không tồn tại.",
  //       });
  //     }

  //     // Lấy danh sách khóa học từ bảng Access
  //     const accessRecords = await Access.find({ user_id: id })
  //       .populate("course_id")
  //       .lean();

  //     if (accessRecords.length === 0) {
  //       return res.status(200).json({
  //         success: true,
  //         totalCourses: 0,
  //         courses: [],
  //         message: "Người dùng chưa truy cập bất kỳ khóa học nào.",
  //       });
  //     }

  //     // Tính toán tiến độ chi tiết
  //     const coursesWithDetails = await Promise.all(
  //       accessRecords.map(async (access) => {
  //         const courseId = access.course_id._id;

  //         // Lấy tất cả các module thuộc khóa học
  //         const modules = await Module.find({ course_id: courseId });
  //         const moduleIds = modules.map((module) => module._id);

  //         // Lấy tất cả tài nguyên thuộc các module
  //         const resources = await Resource.find({
  //           module_id: { $in: moduleIds },
  //         });
  //         const resourceIds = resources.map((resource) => resource._id);

  //         // Lấy tiến độ người dùng trên tài nguyên
  //         const progresses = await Progress.find({
  //           user_id: id,
  //           resource_id: { $in: resourceIds },
  //         });

  //         // Tính toán số tài nguyên đã hoàn thành
  //         const completedResources = progresses.filter(
  //           (progress) => progress.is_completed
  //         ).length;
  //         const totalResources = resourceIds.length;

  //         // Tính toán số module đã hoàn thành
  //         const completedModules = modules.filter((module) => {
  //           const moduleResourceIds = resources
  //             .filter((resource) => resource.module_id.equals(module._id))
  //             .map((resource) => resource._id);
  //           const moduleProgresses = progresses.filter((progress) =>
  //             moduleResourceIds.includes(progress.resource_id)
  //           );
  //           const allResourcesCompleted = moduleResourceIds.every((resId) =>
  //             moduleProgresses.some(
  //               (progress) =>
  //                 progress.resource_id.equals(resId) && progress.is_completed
  //             )
  //           );
  //           return allResourcesCompleted;
  //         }).length;

  //         const totalModules = modules.length;

  //         // Tính tiến độ khóa học
  //         const progressPercentage =
  //           totalResources > 0
  //             ? ((completedResources / totalResources) * 100).toFixed(2)
  //             : 0;

  //         return {
  //           _id: courseId,
  //           title: access.course_id.title,
  //           level: access.course_id.level,
  //           thumbnail: access.course_id.thumbnail,
  //           description: access.course_id.description,
  //           progress: parseInt(progressPercentage),
  //           totalModules,
  //           completedModules,
  //           totalResources,
  //           completedResources,
  //         };
  //       })
  //     );

  //     // Trả về danh sách khóa học cùng tiến độ
  //     return res.status(200).json({
  //       success: true,
  //       userId: id,
  //       totalCourses: coursesWithDetails.length,
  //       courses: coursesWithDetails,
  //       message: "Lấy danh sách khóa học người dùng thành công.",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user courses:", error);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Đã xảy ra lỗi trong quá trình xử lý.",
  //       error: error.message,
  //     });
  //   }
  // }

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

      // Lấy danh sách khóa học mà người dùng đã truy cập
      const accessRecords = await Access.find({ user_id: id })
        .populate("course_id")
        .lean();

      if (!accessRecords.length) {
        return res.status(200).json({
          success: true,
          totalCourses: 0,
          courses: [],
          message: "Người dùng chưa truy cập bất kỳ khóa học nào.",
        });
      }

      // Tính toán chi tiết tiến độ
      const coursesWithDetails = await Promise.all(
        accessRecords.map(async (access) => {
          const course = access.course_id;

          // Lấy tất cả các module trong khóa học
          const modules = await Module.find({ course_id: course._id }).lean();
          const moduleIds = modules.map((module) => module._id);

          // Lấy tất cả các resource trong các module
          const resources = await Resource.find({
            module_id: { $in: moduleIds },
          }).lean();
          const resourceIds = resources.map((resource) => resource._id);

          // Lấy tiến độ người dùng
          const progresses = await Progress.find({
            user_id: id,
            resource_id: { $in: resourceIds },
          }).lean();

          // Tính toán số resource và module đã hoàn thành
          const completedResources = progresses.filter(
            (progress) => progress.is_completed
          ).length;
          const totalResources = resourceIds.length;

          const completedModules = modules.filter((module) => {
            const moduleResources = resources.filter(
              (resource) =>
                resource.module_id.toString() === module._id.toString()
            );
            const moduleResourceIds = moduleResources.map((res) =>
              res._id.toString()
            );

            return moduleResourceIds.every((resId) =>
              progresses.some(
                (progress) =>
                  progress.resource_id.toString() === resId &&
                  progress.is_completed
              )
            );
          }).length;

          const totalModules = modules.length;

          // Tính toán phần trăm tiến độ khóa học
          const progressPercentage =
            totalResources > 0
              ? ((completedResources / totalResources) * 100).toFixed(2)
              : 0;

          // Trả về thông tin khóa học
          return {
            _id: course._id,
            title: course.title,
            level: course.level,
            thumbnail: course.thumbnail,
            description: course.description,
            progress: parseFloat(progressPercentage),
            totalModules,
            completedModules,
            totalResources,
            completedResources,
          };
        })
      );

      // Trả về kết quả
      return res.status(200).json({
        success: true,
        userId: id,
        totalCourses: coursesWithDetails.length,
        courses: coursesWithDetails,
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
