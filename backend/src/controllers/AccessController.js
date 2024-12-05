import axios from "axios";
import Access from "../models/Access.js";
import { BASE_URL } from "../utils/env.js";
import Course from "../models/Course.js";

class AccessController {
  async createAccess(req, res) {
    try {
      const { user_id, course_id, expiration_date } = req.body;
      console.log(req.body);

      const newAccess = new Access({
        user_id,
        course_id,
        expiration_date,
      });

      const savedAccess = await newAccess.save();

      await Course.findByIdAndUpdate(course_id, {
        $inc: { enrollment_count: 1 },
      });

      //  đồng thời tạo progress cho user luôn :))
      const apiUrl = `${BASE_URL}/api/progress/start`;
      const apiResponse = await axios.post(apiUrl, {
        user_id,
        course_id,
      });
      res.status(201).json({
        message: "Access record created successfully and course started",
        data: {
          access: savedAccess,
          progress: apiResponse.data,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create access record",
        error: error.message,
      });
    }
  }

  async getAccessByUser(req, res) {
    try {
      const { userId } = req.params;
      const accessRecords = await Access.find({ user_id: userId }).populate(
        "course_id",
        "name description"
      );
      res.status(200).json({ data: accessRecords });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve access records",
        error: error.message,
      });
    }
  }

  async updateAccess(req, res) {
    try {
      const { accessId } = req.params;
      const { expiration_date } = req.body;

      const updatedAccess = await Access.findByIdAndUpdate(
        accessId,
        { expiration_date },
        { new: true }
      );

      if (!updatedAccess) {
        return res.status(404).json({ message: "Access record not found" });
      }

      res.status(200).json({
        message: "Access record updated successfully",
        data: updatedAccess,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update access record",
        error: error.message,
      });
    }
  }

  async deleteAccess(req, res) {
    try {
      const { accessId } = req.params;

      const deletedAccess = await Access.findByIdAndDelete(accessId);
      if (!deletedAccess) {
        return res.status(404).json({ message: "Access record not found" });
      }

      res.status(200).json({ message: "Access record deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete access record",
        error: error.message,
      });
    }
  }

  async hasAccess(req, res) {
    try {
      const { userId, courseId } = req.params;

      const accessRecord = await Access.findOne({
        user_id: userId,
        course_id: courseId,
      });

      if (accessRecord && accessRecord.expiration_date > new Date()) {
        return res
          .status(200)
          .json({ hasAccess: true, message: "User has access to the course" });
      } else {
        return res
          .status(403)
          .json({ hasAccess: false, message: "Access denied or expired" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to verify access", error: error.message });
    }
  }
}

export default new AccessController();
