import mongoose from "mongoose";
import Module from "../models/Module.js";

class ModuleController {
  async getModulesWithResources(req, res, next) {
    try {
      const courseId = req.params.id;

      const modules = await Module.aggregate([
        {
          $match: { course_id: new mongoose.Types.ObjectId(courseId) },
        },
        {
          $lookup: {
            from: "resources",
            localField: "_id",
            foreignField: "module_id",
            as: "resources",
          },
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
