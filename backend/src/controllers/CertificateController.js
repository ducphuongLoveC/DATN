import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { nanoid } from "nanoid";

import mongoose from "mongoose";
class CertificateController {
 
  async createCertificate(req, res) {
    try {
      const { user_id, course_id, name, description } = req.body;
  
      // Validate if user_id and course_id are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).json({ message: "Invalid course ID format" });
      }
  
      // Check if the user exists
      const userExists = await User.findById(user_id);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the course exists
      const courseExists = await Course.findById(course_id);
      if (!courseExists) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Check if the certificate already exists for the user and course
      const existingCertificate = await Certificate.findOne({
        user_id,
        course_id,
      });
      if (existingCertificate) {
        return res.status(200).json({
          isExist: true,
          message: "Certificate already exists",
          certificate_code: existingCertificate.certificate_code, // Return the existing certificate code
        });
      }
  
      // If no certificate exists, create a new one
      const newCertificate = new Certificate({
        user_id,
        course_id,
        name,
        description,
        certificate_code: nanoid(6), // Generating a unique certificate code
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
