import mongoose from "mongoose";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";
class ResourceController {
  // async getResource(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     let resource;

  //     if (!id) {
  //       resource = await Resource.findOne().sort({ _id: 1 });
  //     } else {
  //       resource = await Resource.findOne({ _id: id });
  //     }
  //     if (!resource) {
  //       resource = await Resource.findOne().sort({ _id: 1 });
  //     }

  //     res.status(200).json(resource);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getResource(req, res, next) {
    try {
      const { id } = req.params;
      let resource;

      if (!id) {
        resource = await Resource.aggregate([
          { $sort: { _id: 1 } },
          {
            $lookup: {
              from: "modules",
              localField: "module_id",
              foreignField: "_id",
              as: "module",
            },
          },
          { $unwind: "$module" },
        ]);
      } else {
        resource = await Resource.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(id) } },
          {
            $lookup: {
              from: "modules",
              localField: "module_id",
              foreignField: "_id",
              as: "module",
            },
          },
          { $unwind: "$module" },
        ]);
      }

      if (!resource || resource.length === 0) {
        resource = await Resource.aggregate([
          { $sort: { _id: 1 } },
          {
            $lookup: {
              from: "modules",
              localField: "module_id",
              foreignField: "_id",
              as: "module",
            },
          },
          { $unwind: "$module" },
        ]);
      }

      res.status(200).json(resource[0] || null);
    } catch (error) {
      next(error);
    }
  }
  async getAdjacentResourceId(req, res, next) {
    try {
      const { id } = req.params;
      const { direction } = req.query;

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
      res.status(200).json({ id: adjacentResource._id });
    } catch (error) {
      next(error);
    }
  }

  async getNameModuleById(req, res, next) {}
}

export default new ResourceController();
