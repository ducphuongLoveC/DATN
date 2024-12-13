import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unthorized",
      });
    }

    const decode = verifyToken(token);

    console.log('here',decode);
    
    if (!decode) {
      return res.status(401).json({
        message: "Token invalid or expired",
      });
    }

    const user = await User.findById(decode._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unthorized",
    });
  }
};

export const checkRoles = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  } else {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
};
