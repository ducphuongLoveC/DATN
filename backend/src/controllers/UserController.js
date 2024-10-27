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
}

export default new UserController();
