import fs from "fs";
import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

import LearningOutcomes from "../models/LearningOutcomes.js";
import LearningPath from "../models/LearningPath.js";

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dauyavqpr",
  api_key: "663283623232467",
  api_secret: "h8EpbOZGM4V5dXUMgrq8rRGhOi4",
});
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


  async getCoursesWithModulesAndResourcesUser(req, res, next) {
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
          $lookup: {
            from: "users",          // Collection to join
            localField: "user_id",   // Field from Course
            foreignField: "_id",     // Field from User
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $project: {
            _id: 1,
            learning_path_id: 1,
            user_id: 1,
            title: 1,
            level: 1,
            learning_outcomes: 1,
            thumbnail: 1,
            description: 1,
            original_price: 1,
            sale_price: 1,
            modules: 1,
            user: 1, // Lấy tất cả trường từ tài liệu người dùng
          },
        },
      ]);
  
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
  async getCourseWithModulesAndResourcesUser(req, res, next) {
    try {
      const { id } = req.params;
  
      const course = await Course.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
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
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $project: {
            _id: 1,
            learning_path_id: 1,
            user_id: 1,
            title: 1,
            level: 1,
            learning_outcomes: 1,
            thumbnail: 1,
            description: 1,
            original_price: 1,
            sale_price: 1,
            modules: 1,
            user: 1,
          },
        },
      ]);
  
      if (course.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json(course[0]); // Trả về khóa học đầu tiên
    } catch (error) {
      next(error);
    }
  }
  
  
  
  addCourseDetail = async (req, res, next) => {
    try {
      const {
        learning_path_id,
        user_id,
        title,
        level,
        description,
        original_price,
        sale_price,
        learning_outcomes,
        modules,
      } = req.body;

      console.log("Received body:", req.body);
      console.log("Received files:", req.files);



      if (!req.files) {
        return res
          .status(400)
          .json({ success: false, message: "No files uploaded" });
      }


      const thumbnailFile = req.files.find((file)=> file.fieldname === 'thumbnail');
      console.log('-----------------',thumbnailFile);
      
      let uploadedThumbnail;
      if (thumbnailFile) {
        uploadedThumbnail = await cloudinary.v2.uploader.upload(thumbnailFile.path);
      }
     
      // Tạo khóa học mới
      const newCourse = new Course({
        learning_path_id,
        user_id,
        title,
        level,
        thumbnail: uploadedThumbnail
          ? uploadedThumbnail.secure_url
          : "default-thumbnail.jpg",
        description,
        original_price,
        sale_price,
        learning_outcomes: Array.isArray(learning_outcomes)
          ? learning_outcomes
          : [learning_outcomes],
      });


      fs.unlink(thumbnailFile.path, (err) => {
        if (err) console.error('Error deleting temp file:', err);
        else console.log('Temp file deleted');
      });


      const savedCourse = await newCourse.save();

      // Xử lý các module và resource
      if (modules && Array.isArray(modules)) {
        for (const module of modules) {
          const newModule = new Module({
            ...module,
            course_id: savedCourse._id,
          });

          const savedModule = await newModule.save();

         
          for (const resource of module.resources) {
            const resourceFile = req.files?.find(
              (file) => file.originalname === resource.fileName
            );
          
            let uploadedFile;
            if (resourceFile) {
              try {
                uploadedFile = await cloudinary.v2.uploader.upload(resourceFile.path, {
                  resource_type: "video",
                  timeout: 240000,  // Ensures adequate time for longer videos
                });
                console.log("Uploaded file URL:", uploadedFile.secure_url);  // Log the uploaded file URL
              } catch (error) {
                console.error("Error uploading file:", error); 
                continue;  
              }
            }
          
            const newResource = new Resource({
              ...resource,
              module_id: savedModule._id,
              url: uploadedFile ? uploadedFile.secure_url : resource.url,
            });
          
            if (resourceFile && uploadedFile) {
              fs.unlink(resourceFile.path, (err) => {
                if (err) console.error("Error deleting temp file:", err);
                else console.log("Temp file deleted");
              });
            }
            await newResource.save();
          }
        }
      }

      res.status(201).json({
        success: true,
        data: savedCourse,
        message: "Course created successfully",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      next(error);
    }
  };

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
      const existingModuleIds = new Set(
        existingModules.map((module) => module._id.toString())
      );

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
        if (
          !modules.some(
            (module) =>
              module._id &&
              module._id.toString() === existingModule._id.toString()
          )
        ) {
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
