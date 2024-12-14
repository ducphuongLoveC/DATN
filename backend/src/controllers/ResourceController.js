import mongoose from "mongoose";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";
import Progress from "../models/Progress.js";
class ResourceController {
  
  async getResource(req, res, next) {
    try {
      const { id, course_id, user_id } = req.params;

      // Ensure valid ObjectId formatting for mongoose
      const courseObjectId = course_id
        ? new mongoose.Types.ObjectId(course_id)
        : null;
      const resourceObjectId = id ? new mongoose.Types.ObjectId(id) : null;
      const userObjectId = user_id
        ? new mongoose.Types.ObjectId(user_id)
        : null;

      let resource;

      if (resourceObjectId) {
        resource = await Resource.aggregate([
          { $match: { _id: resourceObjectId } },
          {
            $lookup: {
              from: "modules", // Join with "modules" collection
              localField: "module_id",
              foreignField: "_id",
              as: "module",
            },
          },
          { $unwind: "$module" },
          {
            $lookup: {
              from: "progresses", // Join with "progresses" collection
              let: { resourceId: "$_id" }, // Define local variables for lookup
              pipeline: [
                {
                  $match: { $expr: { $eq: ["$resource_id", "$$resourceId"] } },
                },
                ...(userObjectId
                  ? [{ $match: { user_id: userObjectId } }] // Filter by user_id
                  : []),
              ],
              as: "progress",
            },
          },
          { $unwind: { path: "$progress", preserveNullAndEmptyArrays: true } }, // Ensure progress exists or is null
        ]);
      } else if (courseObjectId) {
        resource = await Resource.aggregate([
          {
            $lookup: {
              from: "modules",
              localField: "module_id",
              foreignField: "_id",
              as: "module",
            },
          },
          { $unwind: "$module" },
          {
            $match: {
              "module.course_id": courseObjectId, // Match by course_id
            },
          },
          { $sort: { createdAt: 1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: "progresses",
              let: { resourceId: "$_id" }, // Define local variables for lookup
              pipeline: [
                {
                  $match: { $expr: { $eq: ["$resource_id", "$$resourceId"] } },
                },
                ...(userObjectId
                  ? [{ $match: { user_id: userObjectId } }] // Filter by user_id
                  : []),
              ],
              as: "progress",
            },
          },
          { $unwind: { path: "$progress", preserveNullAndEmptyArrays: true } }, // Ensure progress exists or is null
        ]);
      }

      if (
        !resource ||
        resource.length === 0 ||
        !resource[0]?.progress.is_unlocked
      ) {
        return res.status(404).json({ message: "Resource not found" });
      }

      res.status(200).json(resource[0] || null);
    } catch (error) {
      next(error);
    }
  }

//   async getResource(req, res, next) {
//   try {
//     const { id, course_id, user_id } = req.params;

//     // Ensure valid ObjectId formatting for mongoose
//     const courseObjectId = course_id
//       ? new mongoose.Types.ObjectId(course_id)
//       : null;
//     const resourceObjectId = id ? new mongoose.Types.ObjectId(id) : null;
//     const userObjectId = user_id
//       ? new mongoose.Types.ObjectId(user_id)
//       : null;

//     let resource;

//     if (resourceObjectId) {
//       // If resourceObjectId is provided, retrieve the resource with its progress
//       resource = await Resource.aggregate([
//         { $match: { _id: resourceObjectId } },
//         {
//           $lookup: {
//             from: "modules", // Join with "modules" collection
//             localField: "module_id",
//             foreignField: "_id",
//             as: "module",
//           },
//         },
//         { $unwind: "$module" },
//         {
//           $lookup: {
//             from: "progresses", // Join with "progresses" collection
//             let: { resourceId: "$_id" }, // Define local variables for lookup
//             pipeline: [
//               {
//                 $match: { $expr: { $eq: ["$resource_id", "$$resourceId"] } },
//               },
//               ...(userObjectId
//                 ? [{ $match: { user_id: userObjectId } }] // Filter by user_id
//                 : []),
//             ],
//             as: "progress",
//           },
//         },
//         { $unwind: { path: "$progress", preserveNullAndEmptyArrays: true } }, // Ensure progress exists or is null
//       ]);
//     } else if (courseObjectId) {
//       // If no resourceObjectId, retrieve the last unlocked resource for the given course_id
//       resource = await Resource.aggregate([
//         {
//           $lookup: {
//             from: "modules",
//             localField: "module_id",
//             foreignField: "_id",
//             as: "module",
//           },
//         },
//         { $unwind: "$module" },
//         {
//           $match: {
//             "module.course_id": courseObjectId, // Match by course_id
//           },
//         },
//         {
//           $lookup: {
//             from: "progresses",
//             let: { resourceId: "$_id" }, // Define local variables for lookup
//             pipeline: [
//               {
//                 $match: { $expr: { $eq: ["$resource_id", "$$resourceId"] } },
//               },
//               ...(userObjectId
//                 ? [{ $match: { user_id: userObjectId } }] // Filter by user_id
//                 : []),
//             ],
//             as: "progress",
//           },
//         },
//         { $unwind: { path: "$progress", preserveNullAndEmptyArrays: true } }, // Ensure progress exists or is null
//         { $match: { "progress.is_unlocked": true } }, // Only consider resources with unlocked progress
//         { $sort: { createdAt: -1 } }, // Sort by creation date, descending
//         { $limit: 1 }, // Get the most recent resource
//       ]);
//     }

//     if (
//       !resource ||
//       resource.length === 0 ||
//       !resource[0]?.progress.is_unlocked
//     ) {
//       return res.status(404).json({ message: "Resource not found" });
//     }

//     res.status(200).json(resource[0] || null);
//   } catch (error) {
//     next(error);
//   }
// }


  async getAdjacentResourceId(req, res, next) {
    try {
      const { id } = req.params;
      const { direction, user_id } = req.query;

      if (direction && direction !== "previous" && direction !== "next") {
        return res.status(400).json({
          message: 'Invalid direction parameter. Use "previous" or "next".',
        });
      }

      const currentResource = await Resource.findById(id);
      if (!currentResource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      const moduleId = currentResource.module_id;

      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }

      const courseId = module.course_id;

      const course = await Course.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
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
            title: { $first: "$title" },
            resources: { $push: "$modules.resources" },
          },
        },
      ]);

      if (!course || course.length === 0) {
        return res.status(404).json({ message: "Course not found" });
      }

      const allResources = course[0].resources.flatMap((module) => module);

      const currentIndex = allResources.findIndex(
        (resource) => resource._id.toString() === id
      );

      if (currentIndex === -1) {
        return res
          .status(404)
          .json({ message: "Resource not found in course" });
      }

      let adjacentResource = null;

      if (direction === "previous" && currentIndex > 0) {
        adjacentResource = allResources[currentIndex - 1];
      } else if (
        direction === "next" &&
        currentIndex < allResources.length - 1
      ) {
        adjacentResource = allResources[currentIndex + 1];
      } else if (direction === undefined) {
        adjacentResource = allResources[currentIndex];
      } else {
        return res.status(400).json({
          message: 'Invalid direction parameter. Use "previous" or "next".',
        });
      }

      const progress = await Progress.findOne({
        user_id: new mongoose.Types.ObjectId(user_id),
        resource_id: adjacentResource._id,
      });

      res.status(200).json({ ...adjacentResource, progress });
    } catch (error) {
      next(error);
    }
  }
}

export default new ResourceController();
