import Course from "../models/Course.js";
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
      const data = await LearningPath.find().populate("course");
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
    try {
      const data = await LearningPath.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );

      if (data) {
        const updateourse = await Course.findByIdAndUpdate(
          req.body.course,
          {
            $push: { learning_path: data._id },
          },
          { new: true }
        );

        if (data && updateourse) {
          return res.status(200).json({
            success: true,
            data,
            message: "update successfuly",
          });
        }
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

  async removeCourse(req, res, next) {
    try {
      const { learningPathId, courseId } = req.params;
  
      // Tìm LearningPath và xoá Course khỏi danh sách của nó
      const learningPath = await LearningPath.findByIdAndUpdate(
        learningPathId,
        { $pull: { course: courseId } }, // $pull sẽ xoá courseId khỏi mảng course của bảng learningPath
        { new: true }
      );
  
      if (learningPath) {
        return res.status(200).json({
          success: true,
          data: learningPath,
          message: "Course removed from Learning Path successfully",
        });
      }
  
      next();
    } catch (error) {
      next(error);
    }
  }
  
}
export default new learningPath();
