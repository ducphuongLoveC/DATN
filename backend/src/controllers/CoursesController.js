import fs from "fs";
import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

import CourseLearningPath from "../models/CourseLearningPath.js";
import cloudinary from "cloudinary";

class CoursesController {
  async get(req, res, next) {
    try {
      const { search, isFree } = req.query; // Lấy query isFree từ yêu cầu
      let filter = {};

      // Điều kiện tìm kiếm theo title
      if (search) {
        filter.title = { $regex: search, $options: "i" }; // tìm kiếm không phân biệt hoa thường
      }

      // Điều kiện lọc theo isFree
      if (isFree !== undefined) {
        filter.isFree = isFree === "true";
      }

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
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Course ID is required",
        });
      }

      // Find the course by ID
      const course = await Course.findById(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: course,
        message: "Get Course successfully",
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
            from: "users", // Nối với bảng users
            localField: "user_id",
            foreignField: "_id",
            as: "user", // Kết quả trả về dưới dạng mảng với thông tin người dùng
          },
        },
        {
          $unwind: {
            path: "$user", // Chuyển đổi mảng "user" thành đối tượng
            preserveNullAndEmptyArrays: true, // Giữ nguyên khóa học không có người dùng
          },
        },
        {
          $lookup: {
            from: "ratings", // Nối với bảng ratings để lấy thông tin đánh giá
            localField: "_id", // Lấy khóa học ID từ bảng courses
            foreignField: "course_id", // Tìm đánh giá theo khóa học
            as: "ratings", // Kết quả trả về dưới dạng mảng với tất cả các đánh giá
          },
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
            ratings: 1, // Lấy thêm mảng ratings (các đánh giá)
          },
        },
        {
          $addFields: {
            stats: {
              totalRatings: { $size: "$ratings" }, // Số lượng đánh giá
              totalStars: {
                $sum: {
                  $map: {
                    input: "$ratings", // Duyệt qua mảng ratings
                    as: "rating",
                    in: "$$rating.stars", // Tổng sao cho mỗi đánh giá
                  },
                },
              },
            },
          },
        },
        {
          $project: {
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
            stats: 1, // Chỉ lấy thông tin thống kê
          },
        },
        {
          $sort: { _id: -1 }, // Sắp xếp theo ID khóa học giảm dần
        },
      ]);

      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  async getCoursesWithModulesAndResources(req, res, next) {
    try {
      const { search, learning_paths, types, page = 0, limit = 4 } = req.query;

      // Xử lý tham số phân trang
      const currentPage = parseInt(page);
      const pageSize = parseInt(limit);
      const skip = currentPage * pageSize;

      const isFreeFilter =
        types === "true" ? true : types === "false" ? false : null;

      const learningPathsFilter = learning_paths
        ? learning_paths.split(",").map((id) => new mongoose.Types.ObjectId(id))
        : null;

      console.log("Learning paths filter:", learningPathsFilter);

      const courses = await Course.aggregate([
        {
          $match: search ? { title: { $regex: search, $options: "i" } } : {},
        },

        {
          $lookup: {
            from: "courselearningpaths",
            let: { courseId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$course_id", "$$courseId"],
                  },
                },
              },
              ...(learningPathsFilter
                ? [
                    {
                      $match: {
                        learningPath_id: { $in: learningPathsFilter },
                      },
                    },
                  ]
                : []),
            ],
            as: "courseLearningPaths",
          },
        },

        ...(learningPathsFilter
          ? [
              {
                $match: {
                  courseLearningPaths: { $ne: [] },
                },
              },
            ]
          : []),

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
            has_certificate: { $first: "$has_certificate" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
            modules: { $push: "$modules" },
          },
        },

        ...(isFreeFilter !== null
          ? [
              {
                $match: {
                  isFree: isFreeFilter,
                },
              },
            ]
          : []),

        {
          $sort: { _id: -1 },
        },

        // Áp dụng phân trang
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      // Lấy tổng số lượng tài liệu để trả về tổng số trang
      const totalCourses = await Course.countDocuments(
        search ? { title: { $regex: search, $options: "i" } } : {}
      );
      const totalPages = Math.ceil(totalCourses / pageSize);

      res.status(200).json({
        data: courses,
        pagination: {
          currentPage,
          totalPages,
          pageSize,
          totalItems: totalCourses,
        },
      });
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
            has_certificate: { $first: "$has_certificate" },
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

  // async getCourseStatistics(req, res, next) {
  //   try {
  //     const courseId = req.params.id;

  //     // Fetch course data with user statistics and modules/resources
  //     const course = await Course.aggregate([
  //       {
  //         $match: { _id: new mongoose.Types.ObjectId(courseId) },
  //       },
  //       {
  //         $lookup: {
  //           from: "modules",
  //           localField: "_id",
  //           foreignField: "course_id",
  //           as: "modules",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$modules",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "resources",
  //           localField: "modules._id",
  //           foreignField: "module_id",
  //           as: "modules.resources",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "usercourses", // Join with usercourses to get user statistics
  //           localField: "_id",
  //           foreignField: "course_id",
  //           as: "userStats",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           total_users: { $size: "$userStats" }, // Total users enrolled
  //           total_learning_seconds: {
  //             $sum: {
  //               $map: {
  //                 input: "$userStats",
  //                 as: "user",
  //                 in: "$$user.total_time", // Total learning time in seconds
  //               },
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "users", // Lookup for user details based on usercourses
  //           localField: "userStats.user_id",
  //           foreignField: "_id",
  //           as: "enrolled_users",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           enrolled_users: {
  //             $map: {
  //               input: "$enrolled_users",
  //               as: "user",
  //               in: {
  //                 user_id: "$$user._id",
  //                 name: "$$user.name",
  //                 email: "$$user.email",
  //                 profile_picture: "$$user.profile_picture",
  //                 stats: {
  //                   $arrayElemAt: [
  //                     {
  //                       $filter: {
  //                         input: "$userStats",
  //                         as: "userStats",
  //                         cond: { $eq: ["$$userStats.user_id", "$$user._id"] },
  //                       },
  //                     },
  //                     0,
  //                   ],
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           title: { $first: "$title" },
  //           level: { $first: "$level" },
  //           thumbnail: { $first: "$thumbnail" },
  //           enrollment_count: { $first: "$enrollment_count" },

  //           description: { $first: "$description" },
  //           original_price: { $first: "$original_price" },
  //           sale_price: { $first: "$sale_price" },
  //           has_certificate: { $first: "$has_certificate" },
  //           isFree: { $first: "$isFree" },
  //           isActive: { $first: "$isActive" },
  //           total_users: { $first: "$total_users" },
  //           total_learning_seconds: { $first: "$total_learning_seconds" }, // Total time in seconds
  //           modules: { $push: "$modules" },
  //           enrolled_users: { $first: "$enrolled_users" },
  //         },
  //       },
  //       {
  //         $project: {
  //           title: 1,
  //           level: 1,
  //           thumbnail: 1,
  //           enrollment_count: 1,
  //           description: 1,
  //           original_price: 1,
  //           sale_price: 1,
  //           has_certificate: 1,
  //           isFree: 1,
  //           isActive: 1,
  //           total_users: 1,
  //           total_learning_seconds: 1, // Keep total time in seconds
  //           modules: 1,
  //           enrolled_users: 1,
  //         },
  //       },
  //     ]);

  //     if (!course || course.length === 0) {
  //       return res.status(404).json({ message: "Course not found" });
  //     }

  //     res.status(200).json(course[0]); // Return the first course data
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getCourseStatistics(req, res, next) {
    try {
      const courseId = req.params.id;

      // Extract the 'search' parameter from the query
      const { search } = req.query;

      // Fetch course data with user statistics and modules/resources
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
          $lookup: {
            from: "usercourses", // Join with usercourses to get user statistics
            localField: "_id",
            foreignField: "course_id",
            as: "userStats",
          },
        },
        {
          $addFields: {
            total_users: { $size: "$userStats" }, // Total users enrolled
            total_learning_seconds: {
              $sum: {
                $map: {
                  input: "$userStats",
                  as: "user",
                  in: "$$user.total_time", // Total learning time in seconds
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "users", // Lookup for user details based on usercourses
            localField: "userStats.user_id",
            foreignField: "_id",
            as: "enrolled_users",
          },
        },
        {
          $addFields: {
            enrolled_users: {
              $map: {
                input: "$enrolled_users",
                as: "user",
                in: {
                  user_id: "$$user._id",
                  name: "$$user.name",
                  email: "$$user.email",
                  profile_picture: "$$user.profile_picture",
                  stats: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$userStats",
                          as: "userStats",
                          cond: { $eq: ["$$userStats.user_id", "$$user._id"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $addFields: {
            enrolled_users: {
              // Apply search filter if 'search' query is present
              $cond: {
                if: { $and: [{ $ne: [search, null] }, { $ne: ["", search] }] }, // Check if search exists
                then: {
                  $filter: {
                    input: "$enrolled_users",
                    as: "user",
                    cond: {
                      $or: [
                        {
                          $regexMatch: {
                            input: "$$user.name",
                            regex: search,
                            options: "i",
                          },
                        }, // Filter by name (case-insensitive)
                        {
                          $regexMatch: {
                            input: "$$user.email",
                            regex: search,
                            options: "i",
                          },
                        }, // Filter by email (case-insensitive)
                      ],
                    },
                  },
                },
                else: "$enrolled_users", // No filter if search is not provided
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            level: { $first: "$level" },
            thumbnail: { $first: "$thumbnail" },
            enrollment_count: { $first: "$enrollment_count" },
            description: { $first: "$description" },
            original_price: { $first: "$original_price" },
            sale_price: { $first: "$sale_price" },
            has_certificate: { $first: "$has_certificate" },
            isFree: { $first: "$isFree" },
            isActive: { $first: "$isActive" },
            total_users: { $first: "$total_users" },
            total_learning_seconds: { $first: "$total_learning_seconds" }, // Total time in seconds
            modules: { $push: "$modules" },
            enrolled_users: { $first: "$enrolled_users" },
          },
        },
        {
          $project: {
            title: 1,
            level: 1,
            thumbnail: 1,
            enrollment_count: 1,
            description: 1,
            original_price: 1,
            sale_price: 1,
            has_certificate: 1,
            isFree: 1,
            isActive: 1,
            total_users: 1,
            total_learning_seconds: 1, // Keep total time in seconds
            modules: 1,
            enrolled_users: 1,
          },
        },
      ]);

      if (!course || course.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(course[0]); // Return the first course data
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
            has_certificate: { $first: "$has_certificate" },
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
            has_certificate: 1,
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
        has_certificate,
        isFree,
        isActive,
        learning_outcomes,
        modules,
        thumbnail,
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
          thumbnailFile.path,
          { folder: "images" }
        );
      }

      // Tạo khóa học mới
      const newCourse = new Course({
        user_id,
        title,
        level,
        thumbnail: uploadedThumbnail ? uploadedThumbnail.secure_url : thumbnail,
        description,
        original_price,
        sale_price,
        has_certificate,
        isFree,
        isActive,
        learning_outcomes: Array.isArray(learning_outcomes)
          ? learning_outcomes
          : [learning_outcomes],
      });

      if (thumbnailFile) {
        fs.unlink(thumbnailFile.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
          else console.log("Temp file deleted");
        });
      }
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
        for (const moduleIndex in modules) {
          const module = modules[moduleIndex];
          const newModule = new Module({
            ...module,
            course_id: savedCourse._id,
          });

          const savedModule = await newModule.save();

          for (const resourceIndex in module.resources) {
            const resource = module.resources[resourceIndex];

            const resourceFile = req.files?.find(
              (file) => file.originalname === resource.fileName
            );

            const matchedFile = req.files.find(
              (file) =>
                file.fieldname ===
                `modules[${moduleIndex}][resources][${resourceIndex}][thumbnail]`
            );

            let uploadedThumbnailResource = null;

            if (matchedFile) {
              uploadedThumbnailResource = await cloudinary.v2.uploader.upload(
                matchedFile.path,
                { folder: "images" }
              );
            }

            let uploadedFile;

            switch (resource.resource_type) {
              case "Video":
                if (resourceFile) {
                  try {
                    uploadedFile = await cloudinary.v2.uploader.upload(
                      resourceFile.path,
                      {
                        folder: "videos",
                        resource_type: resource.type || "auto",
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
                  thumbnail:
                    uploadedThumbnailResource?.secure_url || resource.thumbnail,
                  url: uploadedFile?.secure_url || resource.url,
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
                  thumbnail:
                    uploadedThumbnailResource?.secure_url || resource.thumbnail,
                  questions: questions,
                  duration: resource.duration,
                  description: resource.description,
                  isActive: resource.isActive,
                });

                await newQuestionResource.save();
                break;

              case "Document":
                const newDocumentResource = new Resource({
                  module_id: savedModule._id,
                  resource_type: "Document",
                  title: resource.title,
                  thumbnail:
                    uploadedThumbnailResource?.secure_url || resource.thumbnail,
                  duration: resource.duration,
                  description: resource.description,
                  isActive: resource.isActive,
                });

                await newDocumentResource.save();
                break;

              case "Document":
                const newCertificateResource = new Resource({
                  module_id: savedModule._id,
                  resource_type: "Certificate",
                  title: resource.title,
                  thumbnail:
                    uploadedThumbnailResource?.secure_url || resource.thumbnail,
                  duration: resource.duration,
                  description: resource.description,
                  isActive: resource.isActive,
                });

                await newCertificateResource.save();
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
        has_certificate,
        isFree,
        isActive,
        modules,
      } = req.body;

      console.log("has_certificate", has_certificate);

      console.log("445", req.files);

      const thumbnailFile = req.files.find(
        (file) => file.fieldname === "thumbnail"
      );
      console.log("-----------------", thumbnailFile);

      let uploadedThumbnail;
      if (thumbnailFile) {
        uploadedThumbnail = await cloudinary.v2.uploader.upload(
          thumbnailFile.path,
          { folder: "images" }
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
          has_certificate,
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

      for (let moduleIndex in modules) {
        const module = modules[moduleIndex];

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
            for (const resourceIndex in module.resources) {
              const resource = module.resources[resourceIndex];
              // console.log(resource);

              const matchedFile = req.files.find(
                (file) =>
                  file.fieldname ===
                  `modules[${moduleIndex}][resources][${resourceIndex}][thumbnail]`
              );

              // upload thum cho resource
              let uploadedThumbnailResource = null;
              if (matchedFile) {
                uploadedThumbnailResource = await cloudinary.v2.uploader.upload(
                  matchedFile.path,
                  { folder: "images" }
                );
              }

              console.log("heree", matchedFile);

              if (resource._id && resource._id.trim() !== "") {
                console.log("check heree");

                // Update existing resource
                let updateData = {};
                let unsetData = {};
                const resourceFile = req.files?.find(
                  (file) => file.originalname === resource.fileName
                );

                if (resourceFile) {
                  // Upload the new file to Cloudinary
                  const uploadedFile = await cloudinary.v2.uploader.upload(
                    resourceFile.path,
                    {
                      folder: "videos",
                      resource_type: resource.type || "auto",
                    }
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
                    updateData = {
                      title: resource.title,
                      description: resource.description,
                      url: resource.url,
                      duration: resource.duration,
                      resource_type: "Video",
                    };
                    unsetData.questions = 1;
                  } else if (resource.resource_type == "Question") {
                    const questions = resource.questions.map((question) => ({
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
                      resource_type: "Question",
                    };
                    unsetData.url = 1;
                  } else if (resource.resource_type === "Document") {
                    updateData = {
                      title: resource.title,
                      description: resource.description,
                      duration: resource.duration,
                      resource_type: "Document",
                      isActive: resource.isActive,
                    };
                    unsetData.url = 1;
                    unsetData.questions = 1;
                    // viết như này để sau còn mở rộng
                  } else if (resource.resource_type === "Certificate") {
                    updateData = {
                      title: resource.title,
                      description: resource.description,
                      duration: resource.duration,
                      resource_type: "Certificate",
                      isActive: resource.isActive,
                    };
                    unsetData.url = 1;
                    unsetData.questions = 1;
                  }
                }

                console.log(updateData);
                // Update the resource
                const res = await Resource.findByIdAndUpdate(
                  resource._id,
                  {
                    ...updateData,
                    $unset: unsetData,
                    thumbnail:
                      uploadedThumbnailResource?.secure_url ||
                      resource.thumbnail,
                    isActive: resource.isActive,
                  },
                  { new: true, runValidators: true }
                );
                console.log(res);
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
                        folder: "videos",
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
                } else if (resource.resource_type === "Document") {
                  newData = {
                    ...restOfResource,
                    module_id: module._id,
                    isActive: restOfResource.isActive,
                  };
                } else if (resource.resource_type === "Certificate") {
                  newData = {
                    ...restOfResource,
                    module_id: module._id,
                    isActive: restOfResource.isActive,
                  };
                }
                const newResource = new Resource({
                  ...newData,
                  thumbnail:
                    uploadedThumbnailResource?.secure_url || resource.thumbnail,
                });
                await newResource.save();
              }

              if (matchedFile) {
                fs.unlink(matchedFile.path, (err) => {
                  if (err) console.error("Error deleting temp file:", err);
                  else console.log("Temp file deleted");
                });
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
          for (const resourceIndex in module.resources) {
            const resource = module.resources[resourceIndex];

            const matchedFile = req.files.find(
              (file) =>
                file.fieldname ===
                `modules[${moduleIndex}][resources][${resourceIndex}][thumbnail]`
            );

            // upload thum cho resource
            let uploadedThumbnailResource = null;
            if (matchedFile) {
              uploadedThumbnailResource = await cloudinary.v2.uploader.upload(
                matchedFile.path,
                { folder: "images" }
              );
            }

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
                    folder: "videos",
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
            } else if (resource.resource_type == "Document") {
              newData = {
                ...restOfResource,
                module_id: savedModule._id,
                isActive: resource.isActive,
              };
            } else if (resource.resource_type == "Certificate") {
              newData = {
                ...restOfResource,
                module_id: savedModule._id,
                isActive: resource.isActive,
              };
            }

            const newResource = new Resource({
              ...newData,
              thumbnail:
                uploadedThumbnailResource?.secure_url || resource.thumbnail,
            });

            await newResource.save();

            if (matchedFile) {
              fs.unlink(matchedFile.path, (err) => {
                if (err) console.error("Error deleting temp file:", err);
                else console.log("Temp file deleted");
              });
            }
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

  async deleteCourseById(req, res, next) {
    try {
      const { id } = req.params; // Lấy course_id từ tham số URL

      // Kiểm tra xem khóa học có tồn tại không
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }

      // Xóa các modules liên quan
      const modules = await Module.find({ course_id: id });
      const moduleIds = modules.map((module) => module._id);

      // Xóa resources liên quan đến các modules
      await Resource.deleteMany({ module_id: { $in: moduleIds } });

      // Xóa các modules
      await Module.deleteMany({ course_id: id });

      // Xóa khóa học
      await Course.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: "Course and related data deleted successfully." });
    } catch (error) {
      next(error); // Gửi lỗi tới middleware xử lý lỗi
    }
  }
}
export default new CoursesController();
