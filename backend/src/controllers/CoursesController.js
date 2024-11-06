import fs from "fs";
import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";


import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dauyavqpr",
  api_key: "663283623232467",
  api_secret: "h8EpbOZGM4V5dXUMgrq8rRGhOi4",
});
class CoursesController {
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
            from: "users", // Collection to join
            localField: "user_id", // Field from Course
            foreignField: "_id", // Field from User
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

      const thumbnailFile = req.files.find(
        (file) => file.fieldname === "thumbnail"
      );
      console.log("-----------------", thumbnailFile);

      let uploadedThumbnail;
      if (thumbnailFile) {
        uploadedThumbnail = await cloudinary.v2.uploader.upload(
          thumbnailFile.path
        );
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
        if (err) console.error("Error deleting temp file:", err);
        else console.log("Temp file deleted");
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
                uploadedFile = await cloudinary.v2.uploader.upload(
                  resourceFile.path,
                  {
                    resource_type: "video",
                    timeout: 240000,
                  }
                );
                console.log("Uploaded file URL:", uploadedFile.secure_url); // Log the uploaded file URL
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

      modules.forEach((m)=>{
        console.log('hêhhe',m);
        
      })
      // Find and update the course
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          title,
          level,
          learning_outcomes: Array.isArray(learning_outcomes)
            ? learning_outcomes
            : [learning_outcomes],
          thumbnail: thumbnail || "default-thumbnail.jpg",
          description,
          original_price,
          sale_price,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      // Get existing modules for the course
      const existingModules = await Module.find({ course_id: courseId });
      const existingModuleIds = new Set(
        existingModules.map((module) => module._id.toString())
      );
  
      // Process modules from the client
      for (let module of modules) {
        module.resources = module.resources || []; // Ensure module.resources is an array


        console.log(module);
        
        // Check if the module has an ID
        if (module._id && module._id.trim() !== "") {
          // Check if the module exists
          if (existingModuleIds.has(module._id.toString())) {
            // Update existing module
            await Module.findByIdAndUpdate(
              module._id,
              { title: module.title },
              { new: true, runValidators: true }
            );
  
            // Handle resources for the existing module
            const existingResources = await Resource.find({
              module_id: module._id,
            });
           

            // Process each resource
            for (const resource of module.resources) {
              if (resource._id[0] && resource._id[0].trim() !== "") {
                // Update existing resource
                let updateData = {};
  
                if (resource.file) {
                  // Upload the new file to Cloudinary
                  const uploadedFile = await cloudinary.v2.uploader.upload(
                    resource.file.path,
                    { resource_type: resource.type || "auto" }
                  );
                  updateData = {
                    title: resource.title,
                    url: uploadedFile.secure_url,
                  };
                } else {
                  // Use existing resource's URL if no new file is provided
                  const existingResource = await Resource.findById(resource._id[0]);
                  updateData = {
                    title: resource.title,
                    url: existingResource?.url || "",
                  };
                }
  
                // Update the resource
                await Resource.findByIdAndUpdate(
                  resource._id[0],
                  { ...updateData },
                  { new: true, runValidators: true }
                );
              } else {
                // Create new resource (ignore _id)
                const { _id, ...restOfResource } = resource;
                const resourceFile = req.files?.find(
                  (file) => file.originalname === restOfResource.fileName
                );
  
                let uploadedFile;
                if (resourceFile) {
                  try {
                    uploadedFile = await cloudinary.v2.uploader.upload(
                      resourceFile.path,
                      {
                        resource_type: resource.type || "auto",
                        timeout: 240000,
                      }
                    );
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    continue; // Skip to next resource on upload error
                  }
                }
  
                const newResource = new Resource({
                  ...restOfResource,
                  module_id: module._id,
                  url: uploadedFile ? uploadedFile.secure_url : resource.url,
                });
                await newResource.save();
              }
            }
  
            // Remove resources not in the updated list
            for (const existingResource of existingResources) {
              if (
                !module.resources.some(
                  (res) =>
                    res._id[0] &&
                    res._id[0].toString() === existingResource._id.toString()
                )
              ) {
                await Resource.findByIdAndDelete(existingResource._id);
              }
            }
          } else {
            return res.status(404).json({
              success: false,
              message: `Module ${module._id} not found`,
            });
          }
        } else {
          // Create a new module if no ID is provided
          const newModule = new Module({
            title: module.title,
            course_id: courseId,
          });
          const savedModule = await newModule.save();
  
          // Handle resources for the new module
          for (const resource of module.resources) {
            const resourceFile = req.files?.find(
              (file) => file.originalname === resource.fileName
            );
  
            let uploadedFile;
            if (resourceFile) {
              try {
                uploadedFile = await cloudinary.v2.uploader.upload(
                  resourceFile.path,
                  {
                    resource_type: resource.type || "auto",
                    timeout: 240000,
                  }
                );
              } catch (error) {
                console.error("Error uploading file:", error);
                continue; // Skip to next resource on upload error
              }
            }
  
            const { _id, ...filId } = resource;
            const newResource = new Resource({
              ...filId,
              module_id: savedModule._id,
              url: uploadedFile ? uploadedFile.secure_url : resource.url,
            });
  
            await newResource.save();
          }
        }
      }
  
      // Remove modules not present in the updated list
      for (const existingModule of existingModules) {
        if (
          !modules.some(
            (module) =>
              module._id && module._id.toString() === existingModule._id.toString()
          )
        ) {
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
}
export default new CoursesController();
