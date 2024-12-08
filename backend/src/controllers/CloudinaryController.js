import cloudinary from "cloudinary";
import fs from 'fs';

cloudinary.config({
  cloud_name: "dgzwrfdjn",
  api_key: "884514879143886",
  api_secret: "L_sdFIOH6Z164w43rJg3p-N_gWw",
});

class CloudinaryController {
  // Lấy tất cả ảnh từ thư mục 'images'
  async getImages(req, res) {
    try {
      const result = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: "images/", // Lọc tài nguyên trong thư mục 'images'
        resource_type: "image", // Chỉ lấy ảnh
      });

      res.status(200).json({
        success: true,
        data: result.resources, // Danh sách ảnh
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch images",
        error: error.message,
      });
    }
  }

  // Lấy tất cả video từ thư mục 'video'
  async getVideos(req, res) {
    try {
      const result = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: "videos/", // Lọc tài nguyên trong thư mục 'video'
        resource_type: "video", // Chỉ lấy video
      });

      res.status(200).json({
        success: true,
        data: result.resources, // Danh sách video
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch videos",
        error: error.message,
      });
    }
  }

  async uploadImage(req, res) {
    try {
      const filePath = req.file.path; // Đường dẫn tới file đã được upload
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: "users", // Thư mục trên Cloudinary
      });

      // Xóa file sau khi upload
      fs.unlinkSync(filePath);

      res.status(200).json({
        success: true,
        url: result.secure_url, // URL của ảnh trên Cloudinary
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error.message,
      });
    }
  }
}

export default new CloudinaryController();
