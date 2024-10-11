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

export const checkIsAdmin = async (req,res,next) => {
    try {
        if(req.user.role === "admin"){
            return next()
        }
        console.log("admin");
        
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized",
          }); 
    }
}

export const checkIsPostManager = async (req,res,next) => {
    try {
        if(req.user.role === "post manager"){
            return next()
        }
        console.log("post manager");
        
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized",
          }); 
    }
}

export const checkIsCourseManager = async (req,res,next) => {
    try {
        if(req.user.role === "course manager"){
            return next()
        }
        console.log("course manager");
        
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized",
          }); 
    }
}

export const checkIsStatisticsManager = async (req,res,next) => {
    try {
        if(req.user.role === "statistics manager"){
            return next()
        }
        console.log("statistics manager");
        
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized",
          }); 
    }
}

export const checkIsCommentManager = async (req,res,next) => {
    try {
        if(req.user.role === "comment manager"){
            return next()
        }
        console.log("comment manager");
        
    } catch (error) {
        return res.status(401).json({
            message: "Unthorized",
          }); 
    }
}

      