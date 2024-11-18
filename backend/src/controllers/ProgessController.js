import Progress from "../models/Progress.js";

class ProgressController {
  // Tạo hoặc lấy tiến độ
  async createOrGetProgress(req, res) {
    try {
      const { user_id, resource_id } = req.body;

      // Kiểm tra xem tiến độ đã tồn tại chưa
      let progress = await Progress.findOne({ user_id, resource_id });
      if (!progress) {
        // Tạo tiến độ mới
        progress = await Progress.create({
          user_id,
          resource_id,
        });
      }
      res.status(200).json({
        message: "Progress retrieved or created successfully",
        progress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  // Cập nhật tiến độ
  async updateProgress(req, res) {
    try {
      const { progressId } = req.params;
      const { is_completed, time_spent } = req.body;

      const progress = await Progress.findById(progressId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }

      // Cập nhật trạng thái
      if (is_completed !== undefined) {
        progress.is_completed = is_completed;
        if (is_completed) {
          progress.completion_date = new Date();
        }
      }

      if (time_spent !== undefined) {
        progress.time_spent += time_spent;
      }

      await progress.save();

      res.status(200).json({
        message: "Progress updated successfully",
        progress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
}

export default new ProgressController();
