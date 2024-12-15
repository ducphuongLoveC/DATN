import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

class CommentController {
  async createComment(req, res) {
    try {
      const { resource_id, user_id, content, parent_id = null } = req.body;

      if (!content || !resource_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Content, resource_id, and user_id are required." });
      }

      // Tạo bình luận mới
      const newComment = new Comment({
        resource_id,
        user_id,
        content,
        parent_id,
      });

      // Lưu bình luận vào cơ sở dữ liệu
      await newComment.save();

      // Nếu có parent_id, cập nhật bình luận cha và tạo thông báo
      if (parent_id) {
        const parentComment = await Comment.findByIdAndUpdate(
          parent_id,
          { $push: { replies: newComment._id } },
          { new: true }
        );

        if (parentComment) {
          const user = await User.findById(user_id);
          const resource = await Resource.findById(resource_id);
          const module = await Module.findById(resource.module_id);
          const course = await Course.findById(module.course_id);

          console.log(user_id);
          console.log(parentComment.user_id.toString());
          // Phát socket thông báo tới người dùng và không tự phát sóng cho chính mình
          if (user_id !== parentComment.user_id.toString()) {
            // Tạo thông báo cho người dùng đã viết bình luận cha
            const notification = new Notification({
              user_id: parentComment.user_id.toString(), // Người nhận thông báo là chủ của parent comment
              type: "comment",
              data: {
                resource_id,
                course_id: course._id,
                parent_id: parent_id,
                thumbnail: resource.thumbnail,
                comment_id: newComment._id,
                title: `<strong> ${user.name}</strong> đã nhắc bạn trong một bình luận của bài học <strong>${resource.title}</strong>`,
                content: newComment.content,
              },
            });

            // Lưu thông báo
            await notification.save();

            req.io
              .to(parentComment.user_id.toString())
              .emit("newNotification", {
                user_id: parentComment.user_id,
                notification,
              });
          }
        }
      }

      // Phát socket bình luận mới trong phòng resource_id
      req.io
        .to(resource_id)
        .emit("newComment", { resource_id, comment: newComment });

      // Trả về bình luận mới vừa tạo
      return res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Lấy danh sách bình luận cho một resource

  async getComments(req, res) {
    try {
      const { resource_id } = req.params;

      // Lấy các bình luận gốc
      const comments = await Comment.aggregate([
        {
          $match: {
            resource_id: new mongoose.Types.ObjectId(resource_id),
            parent_id: null,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: {
            user: { $arrayElemAt: ["$user", 0] },
          },
        },
        { $sort: { timestamp: -1 } },
      ]);

      // Hàm đệ quy để lấy bình luận lồng cấp (replies)
      async function getReplies(commentId) {
        const replies = await Comment.aggregate([
          {
            $match: { parent_id: new mongoose.Types.ObjectId(commentId) },
          },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $addFields: {
              user: { $arrayElemAt: ["$user", 0] },
            },
          },
          { $sort: { timestamp: -1 } },
        ]);

        // Duyệt qua các bình luận trả lời để gọi đệ quy cho các trả lời (nếu có)
        for (let reply of replies) {
          reply.replies = await getReplies(reply._id); // Gọi đệ quy cho các bình luận trả lời
        }

        return replies;
      }

      // Lấy các bình luận trả lời cho mỗi bình luận gốc
      for (let comment of comments) {
        comment.replies = await getReplies(comment._id);
      }

      // Trả kết quả
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllComments(req, res) {
    try {
      const { courseId } = req.query; // Lấy khóa học từ query string

      // Tạo điều kiện lọc nếu có courseId
      const matchCondition = courseId
        ? { "course._id": new mongoose.Types.ObjectId(courseId) }
        : {};

      // Lấy tất cả các bình luận (gồm cả bình luận gốc và trả lời) với điều kiện lọc khóa học
      const comments = await Comment.aggregate([
        {
          $lookup: {
            from: "users", // Lấy thông tin người dùng
            localField: "user_id", // Lấy user_id từ bảng Comment
            foreignField: "_id", // Tìm kiếm người dùng theo _id trong bảng users
            as: "user", // Kết quả nối sẽ được lưu trong trường user
          },
        },
        {
          $addFields: {
            user: { $arrayElemAt: ["$user", 0] }, // Chỉ lấy thông tin người dùng đầu tiên
          },
        },
        {
          $lookup: {
            from: "resources", // Kết nối với bảng Resource
            localField: "resource_id", // Lấy resource_id từ bảng Comment
            foreignField: "_id", // Tìm kiếm resource theo _id trong bảng Resource
            as: "resource", // Kết quả nối sẽ được lưu trong trường resource
          },
        },
        {
          $addFields: {
            resource: { $arrayElemAt: ["$resource", 0] }, // Chỉ lấy thông tin resource đầu tiên
          },
        },
        {
          $lookup: {
            from: "modules", // Kết nối với bảng Module
            localField: "resource.module_id", // Lấy module_id từ bảng Resource
            foreignField: "_id", // Tìm kiếm module theo _id trong bảng Module
            as: "module", // Kết quả nối sẽ được lưu trong trường module
          },
        },
        {
          $addFields: {
            module: { $arrayElemAt: ["$module", 0] }, // Chỉ lấy thông tin module đầu tiên
          },
        },
        {
          $lookup: {
            from: "courses", // Kết nối với bảng Course
            localField: "module.course_id", // Lấy course_id từ bảng Module
            foreignField: "_id", // Tìm kiếm khóa học theo _id trong bảng Course
            as: "course", // Kết quả nối sẽ được lưu trong trường course
          },
        },
        {
          $addFields: {
            course: { $arrayElemAt: ["$course", 0] }, // Chỉ lấy thông tin khóa học đầu tiên
          },
        },
        { $match: matchCondition }, // Lọc bình luận theo khóa học nếu courseId có
        { $sort: { timestamp: -1 } }, // Sắp xếp bình luận theo thời gian giảm dần
      ]);

      // Hàm đệ quy để lấy bình luận lồng cấp (replies)
      async function getReplies(commentId) {
        const replies = await Comment.aggregate([
          {
            $match: { parent_id: new mongoose.Types.ObjectId(commentId) },
          },
          {
            $lookup: {
              from: "users", // Lấy thông tin người dùng trả lời
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $addFields: {
              user: { $arrayElemAt: ["$user", 0] }, // Lấy thông tin người dùng trả lời
            },
          },
          { $sort: { timestamp: -1 } },
        ]);

        // Duyệt qua các bình luận trả lời để gọi đệ quy cho các trả lời (nếu có)
        for (let reply of replies) {
          reply.replies = await getReplies(reply._id); // Gọi đệ quy cho các bình luận trả lời
        }

        return replies;
      }

      // Lấy các bình luận trả lời cho mỗi bình luận
      for (let comment of comments) {
        comment.replies = await getReplies(comment._id);
      }

      // Trả kết quả, bao gồm tên khóa học
      return res.status(200).json(comments || []); // Đảm bảo trả về mảng, ngay cả khi không có bình luận
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params; // Lấy ID của comment từ URL
      const comment = await Comment.findById(id);

      if (!comment) {
        return res.status(404).json({ message: "Comment không tồn tại" });
      }

      // Kiểm tra quyền: Người tạo hoặc admin
      const isOwner = req.user._id.toString() === comment.user_id.toString();
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền xóa comment này" });
      }

      // Tìm các bình luận con liên quan đến bình luận này và xóa chúng
      if (comment.replies && comment.replies.length > 0) {
        // Dùng phương thức $in để tìm tất cả các bình luận con và xóa chúng
        await Comment.deleteMany({ _id: { $in: comment.replies } });
      }

      // Xóa comment gốc
      await Comment.findByIdAndDelete(id);

      console.log();

      req.io
        .to(new mongoose.Types.ObjectId(comment.resource_id).toString())
        .emit("deleteComment", { id });

      return res.status(200).json({ message: "Xóa comment thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  }
}

export default new CommentController();
