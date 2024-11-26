import fs from "fs";
import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

import CourseLearningPath from "../models/CourseLearningPath.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dauyavqpr",
  api_key: "663283623232467",
  api_secret: "h8EpbOZGM4V5dXUMgrq8rRGhOi4",
});
class CoursesController {
  async get(req, res, next) {
    try {
      const { search } = req.query;
      const filter = search ? { title: { $regex: search, $options: "i" } } : {};

      const data = await Course.find(filter);

      return res.status(200).json({
        success: true,
        data,
        message: "Get Learning Path successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCoursesWithUser(req, res, next) {
    try {
      const courses = await Course.aggregate([
        {
          $match: { isActive: true },
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
            user_id: 1,
            title: 1,
            level: 1,
            learning_outcomes: 1,
            thumbnail: 1,
            description: 1,
            original_price: 1,
            sale_price: 1,
            isFree: 1,
            isActive: 1,
            user: 1,
          },
        },
      ]);

      res.status(200).json(courses);
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
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
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
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
            modules: { $push: "$modules" },
          },
        },
        // Lookup từ CourseLearningPath để lấy các learningPath_id
        {
          $lookup: {
            from: "courselearningpaths", // Tên collection của bảng trung gian
            localField: "_id",
            foreignField: "course_id",
            as: "courseLearningPaths",
          },
        },
        {
          $addFields: {
            learning_path_ids: {
              $map: {
                input: "$courseLearningPaths",
                as: "clp",
                in: "$$clp.learningPath_id",
              },
            },
          },
        },
        {
          $unset: "courseLearningPaths",
        },
      ]);

      if (!course || course.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(course[0]);
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
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
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
            isFree: 1,
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
            user_id: { $first: "$user_id" },
            title: { $first: "$title" },
            level: { $first: "$level" },
            learning_outcomes: { $first: "$learning_outcomes" },
            thumbnail: { $first: "$thumbnail" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
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
            user_id: 1,
            title: 1,
            level: 1,
            learning_outcomes: 1,
            thumbnail: 1,
            description: 1,
            original_price: 1,
            sale_price: 1,
            isFree: 1,
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
  // addCourseDetail = async (req, res, next) => {
  //   try {
  //     const {
  //       learning_path_id,
  //       user_id,
  //       title,
  //       level,
  //       description,
  //       original_price,
  //       sale_price,
  //       learning_outcomes,
  //       modules,
  //     } = req.body;

  //     console.log("Received body:", req.body);
  //     console.log("Received files:", req.files);

  //     if (!req.files) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "No files uploaded" });
  //     }

  //     const thumbnailFile = req.files.find(
  //       (file) => file.fieldname === "thumbnail"
  //     );
  //     console.log("-----------------", thumbnailFile);

  //     let uploadedThumbnail;
  //     if (thumbnailFile) {
  //       uploadedThumbnail = await cloudinary.v2.uploader.upload(
  //         thumbnailFile.path
  //       );
  //     }

  //     // Tạo khóa học mới
  //     const newCourse = new Course({
  //       learning_path_id,
  //       user_id,
  //       title,
  //       level,
  //       thumbnail: uploadedThumbnail
  //         ? uploadedThumbnail.secure_url
  //         : "default-thumbnail.jpg",
  //       description,
  //       original_price,
  //       sale_price,
  //       learning_outcomes: Array.isArray(learning_outcomes)
  //         ? learning_outcomes
  //         : [learning_outcomes],
  //     });

  //     fs.unlink(thumbnailFile.path, (err) => {
  //       if (err) console.error("Error deleting temp file:", err);
  //       else console.log("Temp file deleted");
  //     });

  //     const savedCourse = await newCourse.save();

  //     // Xử lý các module và resource
  //     if (modules && Array.isArray(modules)) {
  //       for (const module of modules) {
  //         const newModule = new Module({
  //           ...module,
  //           course_id: savedCourse._id,
  //         });

  //         const savedModule = await newModule.save();

  //         for (const resource of module.resources) {
  //           const resourceFile = req.files?.find(
  //             (file) => file.originalname === resource.fileName
  //           );

  //           let uploadedFile;
  //           if (resourceFile) {
  //             try {
  //               uploadedFile = await cloudinary.v2.uploader.upload(
  //                 resourceFile.path,
  //                 {
  //                   resource_type: "video",
  //                   timeout: 240000,
  //                 }
  //               );
  //               console.log("Uploaded file URL:", uploadedFile.secure_url); // Log the uploaded file URL
  //             } catch (error) {
  //               console.error("Error uploading file:", error);
  //               continue;
  //             }
  //           }

  //           const newResource = new Resource({
  //             ...resource,
  //             module_id: savedModule._id,
  //             url: uploadedFile ? uploadedFile.secure_url : resource.url,
  //           });

  //           if (resourceFile && uploadedFile) {
  //             fs.unlink(resourceFile.path, (err) => {
  //               if (err) console.error("Error deleting temp file:", err);
  //               else console.log("Temp file deleted");
  //             });
  //           }
  //           await newResource.save();
  //         }
  //       }
  //     }

  //     res.status(201).json({
  //       success: true,
  //       data: savedCourse,
  //       message: "Course created successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error adding course:", error);
  //     next(error);
  //   }
  // };

  addCourseDetail = async (req, res, next) => {
    try {
      const {
        learning_path_ids,
        user_id,
        title,
        level,
        description,
        original_price,
        sale_price,
        isFree,
        isActive,
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
        user_id,
        title,
        level,
        thumbnail: uploadedThumbnail
          ? uploadedThumbnail.secure_url
          : "default-thumbnail.jpg",
        description,
        original_price,
        sale_price,
        isFree,
        isActive,
        learning_outcomes: Array.isArray(learning_outcomes)
          ? learning_outcomes
          : [learning_outcomes],
      });

      fs.unlink(thumbnailFile.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
        else console.log("Temp file deleted");
      });

      const savedCourse = await newCourse.save();

      if (Array.isArray(learning_path_ids) && learning_path_ids.length > 0) {
        const newLearningPaths = learning_path_ids.map((learningPathId) => ({
          course_id: savedCourse._id,
          learningPath_id: learningPathId,
        }));
        await CourseLearningPath.insertMany(newLearningPaths);
      }

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

            switch (resource.resource_type) {
              case "Video":
                if (resourceFile) {
                  try {
                    uploadedFile = await cloudinary.v2.uploader.upload(
                      resourceFile.path,
                      {
                        resource_type: "video",
                        timeout: 240000,
                      }
                    );
                    console.log("Uploaded video URL:", uploadedFile.secure_url);
                  } catch (error) {
                    console.error("Error uploading video file:", error);
                    continue;
                  }
                }

                const newVideoResource = new Resource({
                  module_id: savedModule._id,
                  resource_type: "Video",
                  title: resource.title,
                  url: uploadedFile?.secure_url || "",
                  duration: resource.duration || 0,
                  poster: resource.poster || "",
                });

                await newVideoResource.save();
                break;

              case "Question":
                const questions = resource.questions.map((question) => ({
                  question: question.question,
                  options: new Map(Object.entries(question.options)),
                  correctAnswer: question.correctAnswer,
                  hint: question.hint,
                }));

                const newQuestionResource = new Resource({
                  module_id: savedModule._id,
                  resource_type: "Question",
                  title: resource.title,
                  questions: questions,
                  duration: resource.duration,
                  description: resource.description,
                  isActive: resource.isActive,
                });

                await newQuestionResource.save();
                break;

              default:
                console.warn("Unknown resource type:", resource.resource_type);
                continue;
            }

            if (resourceFile && uploadedFile) {
              fs.unlink(resourceFile.path, (err) => {
                if (err) console.error("Error deleting temp file:", err);
                else console.log("Temp file deleted");
              });
            }
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
  // ---------------------------------------------------------------------
  // async updateCourseDetail(req, res, next) {
  //   try {
  //     const courseId = req.params.id;
  //     const {
  //       title,
  //       level,
  //       learning_outcomes,
  //       thumbnail,
  //       description,
  //       original_price,
  //       sale_price,
  //       modules,
  //     } = req.body;

  //     console.log("445", req.files);

  //     const updatedCourse = await Course.findByIdAndUpdate(
  //       courseId,
  //       {
  //         title,
  //         level,
  //         learning_outcomes: Array.isArray(learning_outcomes)
  //           ? learning_outcomes
  //           : [learning_outcomes],
  //         thumbnail: thumbnail || "default-thumbnail.jpg",
  //         description,
  //         original_price,
  //         sale_price,
  //       },
  //       { new: true, runValidators: true }
  //     );

  //     if (!updatedCourse) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Course not found",
  //       });
  //     }

  //     // Get existing modules for the course
  //     const existingModules = await Module.find({ course_id: courseId });
  //     const existingModuleIds = new Set(
  //       existingModules.map((module) => module._id.toString())
  //     );

  //     for (let module of modules) {
  //       console.log("here", module);

  //       module.resources = module.resources || [];

  //       // Check if the module has an ID
  //       if (module._id && module._id.trim() !== "") {
  //         // Check if the module exists
  //         if (existingModuleIds.has(module._id.toString())) {
  //           // Update existing module
  //           await Module.findByIdAndUpdate(
  //             module._id,
  //             { title: module.title },
  //             { new: true, runValidators: true }
  //           );

  //           // Handle resources for the existing module
  //           const existingResources = await Resource.find({
  //             module_id: module._id,
  //           });

  //           // Process each resource
  //           for (const resource of module.resources) {
  //             if (resource._id && resource._id.trim() !== "") {
  //               // Update existing resource
  //               let updateData = {};
  //               const resourceFile = req.files?.find(
  //                 (file) => file.originalname === resource.fileName
  //               );

  //               if (resourceFile) {
  //                 // Upload the new file to Cloudinary
  //                 const uploadedFile = await cloudinary.v2.uploader.upload(
  //                   resourceFile.path,
  //                   { resource_type: resource.type || "auto" }
  //                 );
  //                 updateData = {
  //                   title: resource.title,
  //                   description: resource.description,
  //                   duration: resource.duration,
  //                   url: uploadedFile.secure_url,
  //                 };

  //                 // clear video
  //                 fs.unlink(resourceFile.path, (err) => {
  //                   if (err) console.error("Error deleting temp file:", err);
  //                   else console.log("Temp file deleted");
  //                 });
  //               } else {
  //                 // Use existing resource's URL if no new file is provided
  //                 const existingResource = await Resource.findById(
  //                   resource._id
  //                 );
  //                 updateData = {
  //                   title: resource.title,
  //                   description: resource.description,
  //                   url: existingResource?.url || "",
  //                 };
  //               }

  //               // Update the resource
  //               await Resource.findByIdAndUpdate(
  //                 resource._id,
  //                 { ...updateData },
  //                 { new: true, runValidators: true }
  //               );
  //             } else {
  //               // Create new resource (ignore _id)
  //               const { _id, ...restOfResource } = resource;
  //               const resourceFile = req.files?.find(
  //                 (file) => file.originalname === restOfResource.fileName
  //               );

  //               let uploadedFile;
  //               if (resourceFile) {
  //                 try {
  //                   uploadedFile = await cloudinary.v2.uploader.upload(
  //                     resourceFile.path,
  //                     {
  //                       resource_type: resource.type || "auto",
  //                       timeout: 240000,
  //                     }
  //                   );
  //                   fs.unlink(resourceFile.path, (err) => {
  //                     if (err) console.error("Error deleting temp file:", err);
  //                     else console.log("Temp file deleted");
  //                   });
  //                 } catch (error) {
  //                   console.error("Error uploading file:", error);
  //                   continue; // Skip to next resource on upload error
  //                 }
  //               }

  //               const newResource = new Resource({
  //                 ...restOfResource,
  //                 module_id: module._id,
  //                 url: uploadedFile ? uploadedFile.secure_url : resource.url,
  //               });
  //               await newResource.save();
  //             }
  //           }

  //           // Remove resources not in the updated list
  //           for (const existingResource of existingResources) {
  //             if (
  //               !module.resources.some(
  //                 (res) =>
  //                   res._id &&
  //                   res._id.toString() === existingResource._id.toString()
  //               )
  //             ) {
  //               await Resource.findByIdAndDelete(existingResource._id);
  //             }
  //           }
  //         } else {
  //           return res.status(404).json({
  //             success: false,
  //             message: `Module ${module._id} not found`,
  //           });
  //         }
  //       } else {
  //         // Create a new module if no ID is provided
  //         const newModule = new Module({
  //           title: module.title,
  //           course_id: courseId,
  //         });
  //         const savedModule = await newModule.save();

  //         // Handle resources for the new module
  //         for (const resource of module.resources) {
  //           const resourceFile = req.files?.find(
  //             (file) => file.originalname === resource.fileName
  //           );

  //           let uploadedFile;
  //           if (resourceFile) {
  //             try {
  //               uploadedFile = await cloudinary.v2.uploader.upload(
  //                 resourceFile.path,
  //                 {
  //                   resource_type: resource.type || "auto",
  //                   timeout: 240000,
  //                 }
  //               );
  //             } catch (error) {
  //               console.error("Error uploading file:", error);
  //               continue; // Skip to next resource on upload error
  //             }
  //           }

  //           const { _id, ...filId } = resource;
  //           const newResource = new Resource({
  //             ...filId,
  //             module_id: savedModule._id,
  //             url: uploadedFile ? uploadedFile.secure_url : resource.url,
  //           });

  //           await newResource.save();
  //         }
  //       }
  //     }

  //     // Remove modules not present in the updated list
  //     for (const existingModule of existingModules) {
  //       if (
  //         !modules.some(
  //           (module) =>
  //             module._id &&
  //             module._id.toString() === existingModule._id.toString()
  //         )
  //       ) {
  //         await Module.findByIdAndDelete(existingModule._id);
  //       }
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       data: updatedCourse,
  //       message: "Course updated successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error updating course:", error);
  //     next(error);
  //   }
  // }

  async updateCourseDetail(req, res, next) {
    try {
      const courseId = req.params.id;
      const {
        learning_path_ids,
        title,
        level,
        learning_outcomes,
        thumbnail,
        description,
        original_price,
        sale_price,
        isFree,
        isActive,
        modules,
      } = req.body;

      console.log("445", req.files);

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

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          title,
          level,
          learning_outcomes: Array.isArray(learning_outcomes)
            ? learning_outcomes
            : [learning_outcomes],
          thumbnail: uploadedThumbnail
            ? uploadedThumbnail.secure_url
            : thumbnail,
          description,
          original_price,
          isFree,
          isActive,
          sale_price,
        },
        { new: true, runValidators: true }
      );
      // cập nhật learningPath id vào bảng trung gian
      await CourseLearningPath.deleteMany({ course_id: courseId });
      if (Array.isArray(learning_path_ids) && learning_path_ids.length > 0) {
        const newLearningPaths = learning_path_ids.map((learningPathId) => ({
          course_id: courseId,
          learningPath_id: learningPathId,
        }));
        await CourseLearningPath.insertMany(newLearningPaths);
      }

      if (thumbnailFile) {
        fs.unlink(thumbnailFile.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
          else console.log("Temp file deleted");
        });
      }

      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      // update module
      // Get existing modules for the course
      const existingModules = await Module.find({ course_id: courseId });
      const existingModuleIds = new Set(
        existingModules.map((module) => module._id.toString())
      );

      for (let module of modules) {
        console.log("here", module);

        module.resources = module.resources || [];

        // Check if the module has an ID
        if (module._id && module._id.trim() !== "") {
          // Check if the module exists
          if (existingModuleIds.has(module._id.toString())) {
            // Update existing module
            await Module.findByIdAndUpdate(
              module._id,
              { title: module.title, isActive: module.isActive },
              { new: true, runValidators: true }
            );

            // Handle resources for the existing module
            const existingResources = await Resource.find({
              module_id: module._id,
            });

            // Process each resource
            for (const resource of module.resources) {
              if (resource._id && resource._id.trim() !== "") {
                // Update existing resource
                let updateData = {};
                const resourceFile = req.files?.find(
                  (file) => file.originalname === resource.fileName
                );

                if (resourceFile) {
                  // Upload the new file to Cloudinary
                  const uploadedFile = await cloudinary.v2.uploader.upload(
                    resourceFile.path,
                    { resource_type: resource.type || "auto" }
                  );
                  updateData = {
                    title: resource.title,
                    description: resource.description,
                    duration: resource.duration,
                    url: uploadedFile.secure_url,
                    isActive: resource.isActive,
                  };

                  // clear video
                  fs.unlink(resourceFile.path, (err) => {
                    if (err) console.error("Error deleting temp file:", err);
                    else console.log("Temp file deleted");
                  });
                } else {
                  if (resource.resource_type == "Video") {
                    const existingResource = await Resource.findById(
                      resource._id
                    );

                    updateData = {
                      title: resource.title,
                      description: resource.description,
                      url: existingResource?.url || "",
                    };
                  } else if (resource.resource_type == "Question") {
                    const questions = resource.questions.map((question) => ({
                      _id: question._id,
                      question: question.question,
                      options: new Map(Object.entries(question.options)),
                      correctAnswer: question.correctAnswer,
                      hint: question.hint,
                    }));

                    updateData = {
                      title: resource.title,
                      questions: questions,
                      duration: resource.duration,
                      description: resource.description,
                    };
                  }
                }

                // Update the resource
                await Resource.findByIdAndUpdate(
                  resource._id,
                  { ...updateData, isActive: resource.isActive },
                  { new: true, runValidators: true }
                );
              } else {
                // Create new resource (ignore _id)
                const { _id, ...restOfResource } = resource;

                let newData = {};
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
                    fs.unlink(resourceFile.path, (err) => {
                      if (err) console.error("Error deleting temp file:", err);
                      else console.log("Temp file deleted");
                    });
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    continue; // Skip to next resource on upload error
                  }
                }

                if (restOfResource.resource_type == "Video") {
                  newData = {
                    ...restOfResource,
                    module_id: module._id,
                    url: uploadedFile
                      ? uploadedFile.secure_url
                      : restOfResource.url,
                    isActive: restOfResource.isActive,
                  };
                } else if (resource.resource_type == "Question") {
                  const questions = resource.questions.map((question) => ({
                    question: question.question,
                    options: new Map(Object.entries(question.options)),
                    correctAnswer: question.correctAnswer,
                    hint: question.hint,
                  }));

                  newData = {
                    module_id: module._id,
                    resource_type: "Question",
                    title: resource.title,
                    questions: questions,
                    duration: resource.duration,
                    description: resource.description,
                    isActive: resource.isActive,
                  };
                }

                const newResource = new Resource(newData);
                await newResource.save();
              }
            }

            // Remove resources not in the updated list
            for (const existingResource of existingResources) {
              if (
                !module.resources.some(
                  (res) =>
                    res._id &&
                    res._id.toString() === existingResource._id.toString()
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
            isActive: module.isActive,
          });
          const savedModule = await newModule.save();

          // Handle resources for the new module
          for (const resource of module.resources) {
            const resourceFile = req.files?.find(
              (file) => file.originalname === resource.fileName
            );

            let newData = {};
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

            const { _id, ...restOfResource } = resource;

            if (restOfResource.resource_type == "Video") {
              newData = {
                ...restOfResource,
                module_id: savedModule._id,
                url: uploadedFile ? uploadedFile.secure_url : resource.url,
                isActive: resource.isActive,
              };
            } else if (resource.resource_type == "Question") {
              const questions = resource.questions.map((question) => ({
                question: question.question,
                options: new Map(Object.entries(question.options)),
                correctAnswer: question.correctAnswer,
                hint: question.hint,
              }));

              newData = {
                module_id: savedModule._id,
                resource_type: "Question",
                title: resource.title,
                questions: questions,
                duration: resource.duration,
                description: resource.description,
                isActive: resource.isActive,
              };
            }

            const newResource = new Resource(newData);

            await newResource.save();
          }
        }
      }

      // Remove modules not present in the updated list
      for (const existingModule of existingModules) {
        if (
          !modules.some(
            (module) =>
              module._id &&
              module._id.toString() === existingModule._id.toString()
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

  async getResourcesIdByCourseId(req, res, next) {
    try {
      const { id } = req.params; // Lấy course_id từ tham số URL

      const course = await Course.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }, // Lọc khóa học theo course_id
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
          $project: {
            resources: {
              $map: {
                input: "$modules.resources",
                as: "resource",
                in: "$$resource._id",
              },
            },
          },
        },
        {
          $unwind: "$resources",
        },
        {
          $group: {
            _id: null,
            resource_ids: { $push: "$resources" },
          },
        },
      ]);

      if (!course || course.length === 0) {
        return res
          .status(404)
          .json({ message: "Course not found or no resources available." });
      }

      res.status(200).json({ resource_ids: course[0].resource_ids });
    } catch (error) {
      next(error);
    }
  }
}
export default new CoursesController();
