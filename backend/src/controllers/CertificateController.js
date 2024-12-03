import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { nanoid } from "nanoid";

class CertificateController {
  async createCertificate(req, res) {
    try {
      const { user_id, course_id, name, description } = req.body;

      const userExists = await User.findById(user_id);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const courseExists = await Course.findById(course_id);
      if (!courseExists) {
        return res.status(404).json({ message: "Course not found" });
      }

      const newCertificate = new Certificate({
        user_id,
        course_id,
        name,
        description,
        certificate_code: nanoid(4),
      });

      const savedCertificate = await newCertificate.save();
      res.status(201).json({
        message: "Certificate created successfully",
        data: savedCertificate,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating certificate",
        error: error.message,
      });
    }
  }

  async getAllCertificates(req, res) {
    try {
      const certificates = await Certificate.find()
        .populate("user_id", "name email")
        .populate("course_id", "title description");

      res.status(200).json({
        message: "Certificates retrieved successfully",
        data: certificates,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving certificates",
        error: error.message,
      });
    }
  }

  async getCertificateById(req, res) {
    try {
      const { certificate_code } = req.params;

      const certificate = await Certificate.findOne({ certificate_code })
        .populate("user_id", "name email")
        .populate("course_id", "title description");

      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving certificate",
        error: error.message,
      });
    }
  }
}

export default new CertificateController();
