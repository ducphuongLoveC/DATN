import mongoose from "mongoose";
import Module from "../models/Module.js";

class ModuleController {
  // async getModulesWithResources(req, res, next) {
  //   try {
  //     const courseId = req.params.id;

  //     const modules = await Module.aggregate([
  //       {
  //         $match: {
  //           course_id: new mongoose.Types.ObjectId(courseId),
  //           isActive: true, // Filter active modules
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "resources",
  //           localField: "_id",
  //           foreignField: "module_id",
  //           as: "resources",
  //         },
  //       },
  //       // Filter resources that are active
  //       {
  //         $addFields: {
  //           resources: {
  //             $filter: {
  //               input: "$resources",
  //               as: "resource",
  //               cond: { $eq: ["$$resource.isActive", true] }, // Filter resources by isActive field
  //             },
  //           },
  //         },
  //       },
  //     ]);

  //     if (!modules || modules.length === 0) {
  //       return res.status(404).json({ message: "Modules not found" });
  //     }

  //     res.status(200).json(modules);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getModulesWithResources(req, res, next) {
  //   try {
  //     const courseId = req.params.id;

  //     const modules = await Module.aggregate([
  //       {
  //         $match: {
  //           course_id: new mongoose.Types.ObjectId(courseId),
  //           isActive: true, // Filter active modules
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "resources",
  //           localField: "_id", // Linking module ID
  //           foreignField: "module_id",
  //           as: "resources",
  //         },
  //       },

  //       {
  //         $unwind: "$resources", // Unwind to deal with each resource separately
  //       },
  //       {
  //         $match: {
  //           "resources.isActive": true, // Chỉ giữ resources có isActive = true
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "progresses", // Join progresses collection
  //           localField: "resources._id", // Linking resource ID
  //           foreignField: "resource_id",
  //           as: "progress", // Alias for progress lookup
  //         },
  //       },
  //       {
  //         $addFields: {
  //           "resources.progress": { $arrayElemAt: ["$progress", 0] }, // Extract the first (and only) progress
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$_id", // Group by module ID
  //           title: { $first: "$title" }, // Include module name
  //           resources: { $push: "$resources" }, // Group resources back into array
  //         },
  //       },
  //       {
  //         $sort: { _id: 1 }, // Sắp xếp theo _id tăng dần (1: tăng dần, -1: giảm dần)
  //       },
  //     ]);

  //     if (!modules || modules.length === 0) {
  //       return res.status(404).json({ message: "Modules not found" });
  //     }

  //     res.status(200).json(modules);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getModulesWithResources(req, res, next) {
  //   try {
  //     const courseId = req.params.id;

  //     const modules = await Module.aggregate([
  //       {
  //         $match: {
  //           course_id: new mongoose.Types.ObjectId(courseId),
  //           isActive: true, // Filter active modules
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "resources",
  //           localField: "_id", // Linking module ID
  //           foreignField: "module_id",
  //           as: "resources",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           // Chỉ giữ resources có isActive = true
  //           resources: {
  //             $filter: {
  //               input: "$resources",
  //               as: "resource",
  //               cond: { $eq: ["$$resource.isActive", true] },
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "progresses", // Join progresses collection
  //           localField: "resources._id", // Linking resource ID
  //           foreignField: "resource_id",
  //           as: "progresses",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           resources: {
  //             $map: {
  //               input: "$resources",
  //               as: "resource",
  //               in: {
  //                 $mergeObjects: [
  //                   "$$resource",
  //                   {
  //                     progress: {
  //                       $arrayElemAt: [
  //                         {
  //                           $filter: {
  //                             input: "$progresses",
  //                             as: "progress",
  //                             cond: {
  //                               $eq: [
  //                                 "$$progress.resource_id",
  //                                 "$$resource._id",
  //                               ],
  //                             },
  //                           },
  //                         },
  //                         0,
  //                       ],
  //                     },
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           progresses: 0, // Loại bỏ progresses khỏi kết quả cuối
  //         },
  //       },
  //       {
  //         $sort: { _id: 1 }, // Sắp xếp theo _id tăng dần (1: tăng dần, -1: giảm dần)
  //       },
  //     ]);

  //     if (!modules || modules.length === 0) {
  //       return res.status(404).json({ message: "Modules not found" });
  //     }

  //     res.status(200).json(modules);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getModulesWithResources(req, res, next) {
    try {
      const courseId = req.params.id;
      const userId = req.params.user_id; // Giả sử bạn lấy user_id từ middleware hoặc token

      const modules = await Module.aggregate([
        {
          $match: {
            course_id: new mongoose.Types.ObjectId(courseId),
            isActive: true, // Filter active modules
          },
        },
        {
          $lookup: {
            from: "resources",
            localField: "_id", // Linking module ID
            foreignField: "module_id",
            as: "resources",
          },
        },
        {
          $addFields: {
            // Chỉ giữ resources có isActive = true
            resources: {
              $filter: {
                input: "$resources",
                as: "resource",
                cond: { $eq: ["$$resource.isActive", true] },
              },
            },
          },
        },
        {
          $lookup: {
            from: "progresses", // Join progresses collection
            localField: "resources._id", // Linking resource ID
            foreignField: "resource_id",
            as: "progresses",
          },
        },
        {
          $addFields: {
            resources: {
              $map: {
                input: "$resources",
                as: "resource",
                in: {
                  $mergeObjects: [
                    "$$resource",
                    {
                      progress: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$progresses",
                              as: "progress",
                              cond: {
                                $and: [
                                  {
                                    $eq: [
                                      "$$progress.resource_id",
                                      "$$resource._id",
                                    ],
                                  },
                                  {
                                    $eq: [
                                      "$$progress.user_id",
                                      new mongoose.Types.ObjectId(userId),
                                    ],
                                  }, // Điều kiện theo user_id
                                ],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            progresses: 0, // Loại bỏ progresses khỏi kết quả cuối
          },
        },
        {
          $sort: { _id: 1 }, // Sắp xếp theo _id tăng dần (1: tăng dần, -1: giảm dần)
        },
      ]);

      if (!modules || modules.length === 0) {
        return res.status(404).json({ message: "Modules not found" });
      }

      res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  }

  async getAllModules(req, res) {
    try {
      const modules = await Module.find().populate("course_id");
      return res.status(200).json({
        success: true,
        data: modules,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy danh sách modules.",
        error: error.message,
      });
    }
  }
  async createModule(req, res) {
    const { course_id, title, status } = req.body;

    try {
      const newModule = new Module({ course_id, title, status });
      await newModule.save();
      return res.status(201).json({
        success: true,
        data: newModule,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi tạo module.",
        error: error.message,
      });
    }
  }
  async updateModule(req, res) {
    const { id } = req.params;
    const { course_id, title, status } = req.body;

    try {
      const updatedModule = await Module.findByIdAndUpdate(
        id,
        { course_id, title, status },
        { new: true }
      );
      if (!updatedModule) {
        return res.status(404).json({
          success: false,
          message: "Module không tồn tại.",
        });
      }
      return res.status(200).json({
        success: true,
        data: updatedModule,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi cập nhật module.",
        error: error.message,
      });
    }
  }
  async deleteModule(req, res, next) {
    const { id } = req.params;

    try {
      const deletedModule = await Module.findByIdAndDelete(id);
      if (!deletedModule) {
        return res.status(404).json({
          success: false,
          message: "Module không tồn tại.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Module đã được xóa thành công.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi xóa module.",
        error: error.message,
      });
    }
  }
}
export default new ModuleController();
