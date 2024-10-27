import LearningPath from "../models/LearningPath.js";

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
      const data = await LearningPath.find().sort({ _id: -1 });
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "getAll successfuly",
        });
      }
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

  getLearningPathWithAllDetails = async (req, res) => {
    try {
      const learningPath = await LearningPath.aggregate([
        // Step 1: Join với courses
        {
          $lookup: {
            from: "courses",
            localField: "learning_path_id",
            foreignField: "learning_path_id",
            as: "courses"
          }
        },
        // Step 2: Join với modules cho từng course
        {
          $lookup: {
            from: "modules",
            localField: "courses.course_id", // Đường nối từ courses
            foreignField: "course_id", // Nối với module
            as: "courses.modules"
          }
        },
        // Step 3: Join với resources cho từng module
        {
          $lookup: {
            from: "resources",
            localField: "courses.modules.module_id", // Đường nối từ modules
            foreignField: "module_id", // Nối với resource
            as: "courses.modules.resources"
          }
        },
        // Step 4: Sử dụng $addFields để chèn dữ liệu join vào kết quả
        {
          $addFields: {
            "courses.modules.resources": "$courses.modules.resources"
          }
        },
        // Optional: $group để gộp lại nếu cần thiết
        {
          $group: {
            _id: "$_id",
            learning_path_id: { $first: "$learning_path_id" },
            title: { $first: "$title" },
            description: { $first: "$description" },
            courses: { $first: "$courses" }
          }
        }
      ]);
  
      res.json(learningPath);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
}
export default new learningPath();
