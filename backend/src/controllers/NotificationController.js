import Notification from "../models/Notification.js";

class NotificationController {
  // Lấy danh sách thông báo theo user_id
  async getNotificationsByUserId(req, res) {
    try {
      const { id } = req.params;
      // Kiểm tra xem id có được gửi hay không
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }
      // Tìm thông báo theo id và sắp xếp mới nhất trước
      const notifications = await Notification.find({ user_id: id })
        .sort({ createdAt: -1 }) // Sắp xếp thời gian giảm dần (mới nhất trước)
        .exec();
      // Trả về danh sách thông báo
      return res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Đánh dấu thông báo là đã đọc
  async markAsRead(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra notification_id
      if (!id) {
        return res
          .status(400)
          .json({ message: "Notification ID is required." });
      }

      // Đánh dấu thông báo là đã đọc
      const notification = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
      );
      // Nếu không tìm thấy thông báo
      if (!notification) {
        return res.status(404).json({ message: "Notification not found." });
      }
      // Trả về thông báo đã cập nhật
      return res.status(200).json(notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async markAllAsRead(req, res) {
    try {
      const { id } = req.params; // `id` là `user_id`
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const result = await Notification.updateMany(
        { user_id: id, isRead: false },
        { $set: { isRead: true } }
      );
      return res.status(200).json({
        message: "All notifications marked as read.",
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteAllNotificationsByUserId(req, res) {
    try {
      const { id } = req.params; // `id` là `user_id`
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const result = await Notification.deleteMany({ user_id: id });
      return res.status(200).json({
        message: "All notifications deleted successfully.",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new NotificationController();
