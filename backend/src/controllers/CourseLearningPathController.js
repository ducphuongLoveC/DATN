// import CourseLearningPath from "../models/CourseLearningPath.js";

// class CourseLearningPathController {
//   getCoursesByLearningPathId = async (req, res, next) => {
//     try {
//       const { id } = req.params;

//       const courseLearningPaths = await CourseLearningPath.find({
//         learningPath_id: id,
//       })
//         .populate("course_id")

//         .populate("learningPath_id", "name description");

//       if (!courseLearningPaths || courseLearningPaths.length === 0) {
//         return res
//           .status(404)
//           .json({ message: "No courses found for this learning path." });
//       }

//       const courses = courseLearningPaths.map((clp) => clp.course_id);

//       res.status(200).json({
//         learningPath: courseLearningPaths[0].learningPath_id,
//         courses,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default new CourseLearningPathController();

import CourseLearningPath from "../models/CourseLearningPath.js";

class CourseLearningPathController {
  getCoursesByLearningPathId = async (req, res, next) => {
    try {
      const { id } = req.params;

      // Tìm các khóa học liên quan đến learning path
      const courseLearningPaths = await CourseLearningPath.find({
        learningPath_id: id,
      })
        .populate({
          path: "course_id", // Lấy thông tin khóa học
          populate: {
            path: "user_id", // Join user vào khóa học
            select: "name email nickname profile_picture role isActive", // Các trường cần lấy
          },
        })
        .populate("learningPath_id", "name description"); // Lấy thông tin learning path

      if (!courseLearningPaths || courseLearningPaths.length === 0) {
        return res
          .status(404)
          .json({ message: "No courses found for this learning path." });
      }

      // Tạo danh sách courses với thông tin người dùng
      const courses = courseLearningPaths.map((clp) => {
        const course = clp.course_id;
        const user = course.user_id;

        return {
          _id: course._id,
          user_id: user._id,
          title: course.title,
          level: course.level,
          learning_outcomes: course.learning_outcomes,
          thumbnail: course.thumbnail,
          description: course.description,
          original_price: course.original_price,
          sale_price: course.sale_price,
          isActive: course.isActive,
          isFree: course.isFree,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            profile_picture: user.profile_picture,
            role: user.role,
            isActive: user.isActive,
          },
        };
      });

      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  };
}

export default new CourseLearningPathController();
