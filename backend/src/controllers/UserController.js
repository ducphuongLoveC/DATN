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
      const { name, phone, nickname, referring, profile_picture } = req.body; 
      console.log(req.body)
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, phone, nickname, referring, profile_picture },
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


  // lấy lại mật khẩu
  async changePassword(req, res) {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    console.log('Received request data:', { userId, hasCurrentPass: !!currentPassword, hasNewPass: !!newPassword });

    // Validate input
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin'
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin người dùng'
      });
    }

    try {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Mật khẩu hiện tại không đúng'
        });
      }
    } catch (bcryptError) {
      console.error('Bcrypt error:', bcryptError);
      return res.status(500).json({
        success: false,
        message: 'Lỗi xác thực mật khẩu'
      });
    }

    try {
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Đổi mật khẩu thành công'
      });
    } catch (hashError) {
      console.error('Hash/Save error:', hashError);
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật mật khẩu'
      });
    }

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
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
