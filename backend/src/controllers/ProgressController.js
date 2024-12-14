import axios from "axios";
import Progress from "../models/Progress.js";
import Resource from "../models/Resource.js";
import Module from "../models/Module.js";
import { BASE_URL } from "../utils/env.js";
import mongoose from "mongoose";

class ProgressController {
  // Bắt đầu khóa học và tạo tiến độ cho resource đầu tiên

  async startResource(req, res, next) {
    try {
      const { user_id, course_id } = req.body;

      // Tìm module đầu tiên thuộc khóa học, sắp xếp theo `_id`
      const firstModule = await Module.findOne({ course_id }).sort({ _id: 1 });
      if (!firstModule) {
        return res
          .status(404)
          .json({ message: "No modules found for this course" });
      }

      // Tìm resource đầu tiên trong module đầu tiên, sắp xếp theo `_id`
      const firstResource = await Resource.findOne({
        module_id: firstModule._id,
      }).sort({ _id: 1 });
      if (!firstResource) {
        return res
          .status(404)
          .json({ message: "No resources found in the first module" });
      }

      // Tạo progress cho resource đầu tiên
      const progress = new Progress({
        user_id,
        resource_id: firstResource._id,
        is_unlocked: true,
        is_completed: false,
      });

      await progress.save();

      res.status(200).json({
        message: "Course started, first resource unlocked",
        resource_id: firstResource._id,
      });
    } catch (error) {
      next(error);
    }
  }

  // async completeResource(req, res, next) {
  //   try {
  //     const { resource_id, user_id } = req.params;

  //     // Tìm resource hiện tại
  //     const currentResource = await Resource.findById(resource_id);
  //     if (!currentResource) {
  //       return res.status(404).json({ message: "Resource not found" });
  //     }

  //     // Kiểm tra tiến độ của user cho resource hiện tại
  //     const progress = await Progress.findOne({
  //       user_id: user_id,
  //       resource_id: resource_id,
  //     });
  //     if (!progress) {
  //       return res.status(404).json({ message: "Progress not found" });
  //     }

  //     // Cập nhật trạng thái hoàn thành cho resource hiện tại
  //     progress.is_completed = true;
  //     await progress.save();

  //     // cập nhật userCourser
  //     const module_id = currentResource.module_id;
  //     const module = await Module.findById(module_id);
  //     const course_id = module.course_id;

  //     await axios.post(
  //       `${BASE_URL}/api/user-course`,
  //       {
  //         user_id,
  //         course_id,
  //         progress: 0,
  //         status: "enrolled",
  //         total_time: 0,
  //         last_accessed: new Date(),
  //       }
  //     );

  //     const response = await axios.get(
  //       `${BASE_URL}/api/resource/${resource_id}/adjacent/id?direction=next`
  //     );
  //     const nextResource = response.data; // Giả sử API trả về thông tin về resource tiếp theo

  //     console.log(nextResource);
  //     if (nextResource) {
  //       // Kiểm tra nếu tiến độ cho resource tiếp theo đã tồn tại
  //       let nextProgress = await Progress.findOne({
  //         user_id: user_id,
  //         resource_id: nextResource._id,
  //       });

  //       if (nextProgress) {
  //         // Nếu tiến độ đã có, chỉ cần cập nhật
  //         nextProgress.is_unlocked = true;
  //         await nextProgress.save();
  //       } else {
  //         // Nếu chưa có, tạo mới tiến độ cho resource tiếp theo
  //         nextProgress = new Progress({
  //           user_id: user_id,
  //           resource_id: nextResource._id,
  //           is_unlocked: true,
  //           is_completed: false,
  //         });
  //         await nextProgress.save();
  //       }

  //       res.status(200).json({
  //         message: "Resource completed, next resource unlocked",
  //         nextResourceId: nextResource._id,
  //       });
  //     } else {
  //       res.status(200).json({ message: "All resources completed" });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async completeResource(req, res, next) {
    try {
      const { resource_id, user_id } = req.params;

      // Tìm resource hiện tại
      const currentResource = await Resource.findById(resource_id);
      if (!currentResource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Kiểm tra tiến độ của user cho resource hiện tại
      const progress = await Progress.findOne({
        user_id: user_id,
        resource_id: resource_id,
      });
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }

      // Cập nhật trạng thái hoàn thành cho resource hiện tại
      progress.is_completed = true;
      await progress.save();

      // cập userCourser ------------------------------------------------------------------
      // Lấy thông tin module và course_id từ module
      const module_id = currentResource.module_id;
      const module = await Module.findById(module_id);
      const course_id = module.course_id;

      console.log(currentResource.duration);
      

      await axios.post(`${BASE_URL}/api/user-course`, {
        user_id,
        course_id,
        status: "enrolled",
        total_time: currentResource.duration,
        last_accessed: new Date(),
      });

      // cập nhật resource tiếp theo ------------------------------------------------------------
      // Lấy thông tin về resource tiếp theo
      const response = await axios.get(
        `${BASE_URL}/api/resource/${resource_id}/adjacent/id?direction=next`
      );
      const nextResource = response.data;

      console.log(nextResource);
      if (nextResource) {
        // Kiểm tra nếu tiến độ cho resource tiếp theo đã tồn tại
        let nextProgress = await Progress.findOne({
          user_id: user_id,
          resource_id: nextResource._id,
        });

        if (nextProgress) {
          // Nếu tiến độ đã có, chỉ cần cập nhật
          if (!nextProgress.is_unlocked) {
            nextProgress.is_unlocked = true;
            await nextProgress.save();
          }
        } else {
          // Nếu chưa có, tạo mới tiến độ cho resource tiếp theo
          nextProgress = new Progress({
            user_id: user_id,
            resource_id: nextResource._id,
            is_unlocked: true,
            is_completed: false,
          });
          await nextProgress.save();
        }

        res.status(200).json({
          message: "Resource completed, next resource unlocked",
          nextResourceId: nextResource._id,
        });
      } else {
        res.status(200).json({ message: "All resources completed" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new ProgressController();
