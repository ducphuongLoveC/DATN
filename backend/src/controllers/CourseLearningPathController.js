import CourseLearningPath from "../models/CourseLearningPath.js";
import Rating from "../models/Rating.js";
class CourseLearningPathController {
  
  // getCoursesByLearningPathId = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;

  //     // Tìm các khóa học liên quan đến learning path
  //     const courseLearningPaths = await CourseLearningPath.find({
  //       learningPath_id: id,
  //     })
  //       .populate({
  //         path: "course_id", // Lấy thông tin khóa học
  //         populate: {
  //           path: "user_id", // Join user vào khóa học
  //           select: "name email nickname profile_picture role isActive", // Các trường cần lấy
  //         },
  //       })
  //       .populate("learningPath_id", "name description"); // Lấy thông tin learning path

  //     if (!courseLearningPaths || courseLearningPaths.length === 0) {
  //       return res
  //         .status(404)
  //         .json({ message: "No courses found for this learning path." });
  //     }

  //     // Tạo danh sách courses với thông tin người dùng và thống kê đánh giá
  //     const courses = await Promise.all(
  //       courseLearningPaths.map(async (clp) => {
  //         const course = clp.course_id;
  //         const user = course.user_id;

  //         // Lấy thống kê đánh giá cho khóa học
  //         const ratingsStats = await Rating.aggregate([
  //           { $match: { course_id: course._id } },
  //           {
  //             $group: {
  //               _id: "$course_id",
  //               totalRatings: { $sum: 1 }, // Số lượng đánh giá
  //               totalStars: {
  //                 $sum: "$stars", // Tổng sao của các đánh giá
  //               },
  //             },
  //           },
  //         ]);

  //         const stats =
  //           ratingsStats.length > 0
  //             ? ratingsStats[0]
  //             : { totalRatings: 0, totalStars: 0 };

  //         return {
  //           _id: course._id,
  //           user_id: user._id,
  //           title: course.title,
  //           level: course.level,
  //           learning_outcomes: course.learning_outcomes,
  //           thumbnail: course.thumbnail,
  //           description: course.description,
  //           original_price: course.original_price,
  //           sale_price: course.sale_price,
  //           isActive: course.isActive,
  //           isFree: course.isFree,
  //           user: {
  //             _id: user._id,
  //             name: user.name,
  //             email: user.email,
  //             nickname: user.nickname,
  //             profile_picture: user.profile_picture,
  //             role: user.role,
  //             isActive: user.isActive,
  //           },
  //           stats: {
  //             totalRatings: stats.totalRatings,
  //             totalStars: stats.totalStars,
  //           },
  //         };
  //       })
  //     );

  //     res.status(200).json(courses);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

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
  
      // Tạo danh sách courses với thông tin người dùng và thống kê đánh giá
      const courses = await Promise.all(
        courseLearningPaths.map(async (clp) => {
          const course = clp.course_id;
          const user = course.user_id;
  
          // Chỉ lấy các khóa học có isActive = true
          if (!course.isActive) {
            return null; // Skip inactive courses
          }
  
          // Lấy thống kê đánh giá cho khóa học
          const ratingsStats = await Rating.aggregate([
            { $match: { course_id: course._id } },
            {
              $group: {
                _id: "$course_id",
                totalRatings: { $sum: 1 }, // Số lượng đánh giá
                totalStars: {
                  $sum: "$stars", // Tổng sao của các đánh giá
                },
              },
            },
          ]);
  
          const stats =
            ratingsStats.length > 0
              ? ratingsStats[0]
              : { totalRatings: 0, totalStars: 0 };
  
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
            stats: {
              totalRatings: stats.totalRatings,
              totalStars: stats.totalStars,
            },
          };
        })
      );
  
      // Lọc bỏ các khóa học null (inactive courses)
      const activeCourses = courses.filter(course => course !== null);
  
      res.status(200).json(activeCourses);
    } catch (error) {
      next(error);
    }
  };
  
}

export default new CourseLearningPathController();
