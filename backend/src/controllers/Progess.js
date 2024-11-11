import Progress from "../models/Progress";

class ProgressController {
  // Tạo mới tiến độ
  static async createProgress(req, res) {
    const { user_id, resource_id } = req.body;
    if (!user_id || !resource_id) {
      return res
        .status(400)
        .json({ message: "user_id and resource_id are required" });
    }
    try {
      // Kiểm tra xem tiến độ đã tồn tại chưa
      const existingProgress = await Progress.findOne({ user_id, resource_id });
      if (existingProgress) {
        return res.status(400).json({ message: "Progress already exists" });
      }

      // Tạo tiến độ mới
      const progress = new Progress({
        user_id,
        resource_id,
        isCompleted: false, // Mặc định isCompleted là false
      });

      // Lưu tiến độ vào cơ sở dữ liệu
      await progress.save();
      return res
        .status(201)
        .json({ message: "Progress created successfully", progress });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  // Cập nhật trạng thái isCompleted của tiến độ
  static async updateProgress(req, res) {
    const { user_id, resource_id, isCompleted } = req.body;

    if (
      user_id === undefined ||
      resource_id === undefined ||
      isCompleted === undefined
    ) {
      return res.status(400).json({
        message: "user_id, resource_id, and isCompleted are required",
      });
    }

    try {
      // Tìm tiến độ hiện tại của người dùng đối với tài nguyên
      const progress = await Progress.findOne({ user_id, resource_id });

      // Nếu không tìm thấy tiến độ, trả về lỗi
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      // Cập nhật trạng thái isCompleted
      progress.isCompleted = isCompleted;

      // Nếu isCompleted là true, cập nhật thêm completion_date
      if (isCompleted) {
        progress.completion_date = new Date(); // Lưu ngày hoàn thành
      }

      // Lưu lại tiến độ đã cập nhật vào cơ sở dữ liệu
      await progress.save();

      // Gửi phản hồi thành công
      return res
        .status(200)
        .json({ message: "Progress updated successfully", progress });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default ProgressController;
