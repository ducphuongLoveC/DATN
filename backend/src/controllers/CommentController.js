import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";

class CommentController {
  // Tạo bình luận mới

  // async createComment(req, res) {
  //   try {
  //     const { resource_id, user_id, content, parent_id = null } = req.body;

  //     if (!content || !resource_id || !user_id) {
  //       return res
  //         .status(400)
  //         .json({ message: "Content, resource_id, and user_id are required." });
  //     }

  //     // Tạo bình luận mới
  //     const newComment = new Comment({
  //       resource_id,
  //       user_id,
  //       content,
  //       parent_id,
  //     });

  //     // Lưu bình luận vào cơ sở dữ liệu
  //     await newComment.save();

  //     // Nếu có parent_id, cập nhật bình luận cha thêm ID của bình luận con vào mảng replies
  //     if (parent_id) {
  //       await Comment.findByIdAndUpdate(parent_id, {
  //         $push: { replies: newComment._id },
  //       });
  //     }

  //     req.io
  //       .to(resource_id)
  //       .emit("newComment", { resource_id, comment: newComment });
  //     // Trả về bình luận mới vừa tạo
  //     return res.status(201).json(newComment);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

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
          // Tạo thông báo cho người dùng đã viết bình luận cha
          const notification = new Notification({
            user_id: parentComment.user_id, // Người nhận thông báo là chủ của parent comment
            type: "comment",
            data: {
              resource_id,
              commentId: newComment._id,
              content: `${newComment.content} (bạn được nhắc trong một bình luận)`,
              parent_id: parent_id,
            },
          });

          // Lưu thông báo
          await notification.save();

          // Phát socket thông báo tới người dùng
          req.io.to(parentComment.user_id.toString()).emit("newNotification", {
            user_id: parentComment.user_id,
            notification,
          });
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