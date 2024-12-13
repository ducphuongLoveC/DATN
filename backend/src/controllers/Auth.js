import User from "../models/User.js";
import { generrateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

class Auth {
  async register(req, res, next) {
    try {

      console.log('check');
      
      const { email, password, name, phone, profile_picture, role } = req.body;
      const useExists = await User.findOne({ email });
      console.log(useExists);
      if (useExists) {
        return res.status(400).json({
          message: "email da ton tai",
        });
      }

      const hashPass = hashPassword(password);
      if (!hashPass) {
        return res.status(400).json({
          message: "ma hoa that bai",
        });
      }

      const user = await User.create({
        email,
        password: hashPass,
        name,
        phone,
        profile_picture,
        role,
      });

      return res.status(201).json({
        success: true,
        user,
        message: "dang ky thanh cong",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const useExists = await User.findOne({ email });

      if (!useExists) {
        return res.status(404).json({
          message: "Email chua dang ky",
        });
      }

      const isMath = comparePassword(password, useExists.password);
      if (!isMath) {
        return res.status(400).json({
          message: "Mat khau khong dung",
        });
      }
      const token = generrateToken({ _id: useExists._id }, "100d");

      useExists.password = undefined;

      return res.status(200).json({
        success: true,
        user: useExists,
        accessToken: token,
        message: "Login successfully",
      });
    } catch (error) {
      next(error);
    }
  }
 
}
export default new Auth();
