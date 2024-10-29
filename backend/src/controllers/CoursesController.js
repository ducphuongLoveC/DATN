import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

import LearningOutcomes from "../models/LearningOutcomes.js";
import LearningPath from "../models/LearningPath.js";

class CoursesController {
  async create(req, res, next) {
    try {
      const data = await Course.create(req.body);
      console.log(data);

      if (data) {
        const updateLearningPath = await LearningPath.findByIdAndUpdate(
          req.body.learning_path,
          {
            $push: { course: data._id },
          },
          { new: true }
        );

        // Tìm và cập nhật hoặc tạo mới trong bảng LearningOutcomes
        const updateLearningOutcome = await LearningOutcomes.findOneAndUpdate(
          { _id: req.body.learningOutcomes }, // Điều kiện tìm kiếm dựa trên learningOutcomesId
          {
            $set: { ...req.body.learningOutcomes }, // Cập nhật dữ liệu LearningOutcomes
            $set: { course: data._id }, // Đẩy ID khoá học vào mảng course
          },
          { upsert: true, new: true } // Tạo mới nếu không tìm thấy, trả về tài liệu mới sau khi cập nhật
        );

        if (data && updateLearningPath && updateLearningOutcome) {
          return res.status(201).json({
            success: true,
            data,
            message: "Course created/updated successfully",
          });
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Course.find();
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "get Learning Path successfuly",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getCoursesWithModulesAndResources(req, res, next) {
    try {
      const courses = await Course.aggregate([
        {
          $lookup: {
            from: "modules",
            localField: "_id",
            foreignField: "course_id",
            as: "modules",
          },
        },
        {
          $unwind: {
            path: "$modules",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "resources",
            localField: "modules._id",
            foreignField: "module_id",
            as: "modules.resources",
          },
        },
        {
          $group: {
            _id: "$_id",
            learning_path_id: { $first: "$learning_path_id" },
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            modules: { $push: "$modules" },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  async getCourseWithModulesAndResources(req, res, next) {
    try {
      const courseId = req.params.id;

      const course = await Course.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(courseId) },
        },
        {
          $lookup: {
            from: "modules",
            localField: "_id",
            foreignField: "course_id",
            as: "modules",
          },
        },
        {
          $unwind: {
            path: "$modules",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "resources",
            localField: "modules._id",
            foreignField: "module_id",
            as: "modules.resources",
          },
        },
        {
          $group: {
            _id: "$_id",
            learning_path_id: { $first: "$learning_path_id" },
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            modules: { $push: "$modules" },
          },
        },
      ]);

      if (!course || course.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(course[0]); // Trả về khóa học đầu tiên vì chỉ có một kết quả
    } catch (error) {
      next(error);
    }
  }

  async addCourseDetail(req, res, next) {
    try {
      const {
        learning_path_id,
        user_id,
        title,
        level,
        learning_outcomes,
        thumbnail,
        description,
        original_price,
        sale_price,
        modules,
      } = req.body;

      console.log(learning_outcomes);

      // Tạo khóa học
      const newCourse = new Course({
        learning_path_id,
        user_id,
        title,
        level,
        thumbnail: "test",
        description,
        original_price,
        sale_price,
        learning_outcomes,
      });

      // Lưu khóa học vào cơ sở dữ liệu
      const savedCourse = await newCourse.save();

      // Tạo mới các modules
      const modulesToUpdate = modules || []; // Lấy modules từ req.body
      for (const module of modulesToUpdate) {
        // Tạo mới module
        const newModule = new Module({
          ...module,
          course_id: savedCourse._id, // Liên kết với khóa học
        });

        // Lưu module mới vào cơ sở dữ liệu
        const savedModule = await newModule.save(); // Lưu module

        // Cập nhật các resources bên trong từng module
        const resourcesToUpdate = module.resources || [];
        for (const resource of resourcesToUpdate) {
          // Tạo mới resource
          const newResource = new Resource({
            ...resource,
            module_id: savedModule._id, // Liên kết với module
          });

          // Lưu resource mới vào cơ sở dữ liệu
          await newResource.save();
        }
      }

      return res.status(201).json({
        success: true,
        data: savedCourse,
        message: "Course created successfully",
      });
    } catch (error) {
      console.log("--------------------------------------------------");
      console.log(error);
      next(error);
    }
  }

  async updateCourseDetail(req, res, next) {
    try {
        console.log(req.body);

        const courseId = req.params.id;
        const {
            title,
            level,
            learning_outcomes,
            thumbnail,
            description,
            original_price,
            sale_price,
            modules,
        } = req.body;

        // Tìm khóa học theo ID và cập nhật thông tin
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                level,
                learning_outcomes,
                thumbnail: "test100.png", // Thay đổi tạm thời
                description,
                original_price,
                sale_price,
            },
            { new: true, runValidators: true } // Trả về bản ghi mới đã cập nhật và kiểm tra các validator
        );
        
        // Lấy danh sách module hiện có trong cơ sở dữ liệu
        const existingModules = await Module.find({ course_id: courseId });

        // Tạo một tập hợp các ID của module hiện có
        const existingModuleIds = new Set(existingModules.map(module => module._id.toString()));

        // Xử lý các module từ client
        for (const module of modules) {
            if (module._id) {
                // Nếu có ID, kiểm tra xem module có tồn tại không
                if (existingModuleIds.has(module._id.toString())) {
                    // Cập nhật module đã tồn tại
                    await Module.findByIdAndUpdate(
                        module._id,
                        { title: module.title },
                        { new: true, runValidators: true }
                    );

                    // Cập nhật tài nguyên cho module đã tồn tại
                    for (const resource of module.resources) {
                        if (resource._id) {
                            // Nếu có ID resource, cập nhật tài nguyên đó
                            await Resource.findByIdAndUpdate(resource._id, resource, {
                                new: true,
                                runValidators: true,
                            });
                        } else {
                            // Nếu không có ID, tạo mới tài nguyên
                            const newResource = new Resource({
                                ...resource,
                                module_id: module._id,
                            });
                            await newResource.save();
                        }
                    }
                } else {
                    // Nếu không tìm thấy module, trả về thông báo lỗi
                    return res.status(404).json({
                        success: false,
                        message: `Module ${module._id} not found`,
                    });
                }
            } else {
                // Nếu không có ID, tạo mới module
                const newModule = new Module({
                    title: module.title,
                    course_id: courseId,
                });
                const savedModule = await newModule.save();

                // Cập nhật tài nguyên cho module mới
                for (const resource of module.resources) {
                    const newResource = new Resource({
                        ...resource,
                        module_id: savedModule._id,
                    });
                    await newResource.save();
                }
            }
        }

        // Xóa các module không còn trong danh sách từ client
        for (const existingModule of existingModules) {
            if (!modules.some(module => module._id && module._id.toString() === existingModule._id.toString())) {
                // Nếu module không còn trong danh sách, xóa module
                await Module.findByIdAndDelete(existingModule._id);
            }
        }

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Course updated successfully",
        });
    } catch (error) {
        console.error("Error updating course:", error);
        next(error);
    }
}


  async getDetail(req, res, next) {
    try {
      const data = await Course.findById(req.params.id)
        .populate("learningOutcomes")
        .populate("learning_path");
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "getDetail Learning Path successfuly",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async detete(req, res, next) {
    try {
      const data = await Course.findByIdAndDelete(req.params.id);
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "delete Learning Path successfuly",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Course.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );

      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "update Learning Path successfuly",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
export default new CoursesController();