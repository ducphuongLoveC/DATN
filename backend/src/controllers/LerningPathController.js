import LearningPath from "../models/LearningPath.js";
import Course from "../models/Course.js";

class learningPath {
  async create(req, res, next) {
    try {
      const data = await LearningPath.create(req.body);
      if (data) {
        return res.status(201).json({
          success: true,
          data,
          message: "create successfuly",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { search } = req.query; // Lấy tham số 'search' từ query string
      const query = search
        ? { title: { $regex: search, $options: "i" } } // Tìm kiếm theo tiêu đề, không phân biệt hoa thường
        : {}; // Nếu không có tham số, lấy tất cả

      const data = await LearningPath.find(query).sort({ _id: -1 });

      return res.status(200).json({
        success: true,
        data,
        message: "getAll successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const data = await LearningPath.findById(req.params.id).populate(
        "course"
      );
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "getDetail successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    console.log(req);
    try {
      const data = await LearningPath.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );

      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "update successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await LearningPath.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "delete successfuly",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
export default new learningPath();
