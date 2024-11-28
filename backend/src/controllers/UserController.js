import User from "../models/User.js";
class UserController {
  async get(req, res, next) {
    try {
      const data = await User.find();
      if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "get successfully",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, phone } = req.body;  // Chỉ lấy name và phone
  
      // Tìm và cập nhật người dùng theo id
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, phone },  // Chỉ cập nhật name và phone
        { new: true } // Trả về dữ liệu đã cập nhật
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Người dùng không tồn tại",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Cập nhật thông tin người dùng thành công",
      });
    } catch (error) {
      next(error);
    }
  }
  
}

export default new UserController();
