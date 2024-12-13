import UserCourse from "../models/userCourse.js";

class UserCourseController {
  async createOrUpdateUserCourse(req, res) {
    const { user_id, course_id, status, total_time, last_accessed } = req.body;

    try {
      let userCourse = await UserCourse.findOne({ user_id, course_id });

      if (userCourse) {
        // Cộng dồn giá trị cũ với giá trị mới
        userCourse.status = status || userCourse.status;
        userCourse.total_time =
          (userCourse.total_time || 0) + (total_time || 0);
        userCourse.last_accessed = last_accessed || userCourse.last_accessed;

        await userCourse.save();
        return res
          .status(200)
          .json({ message: "UserCourse updated successfully", userCourse });
      } else {
        // Nếu chưa có UserCourse, tạo mới
        userCourse = new UserCourse({
          user_id,
          course_id,
          status: status || "enrolled",
          total_time: total_time || 0,
          last_accessed: last_accessed || null,
        });

        await userCourse.save();
        return res
          .status(201)
          .json({ message: "UserCourse created successfully", userCourse });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default new UserCourseController();
