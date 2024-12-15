import cloudinary from "cloudinary";
import fs from 'fs';


class CloudinaryController {

  async getImages(req, res) {
    try {
      const { order = 'asc' } = req.query; // Lấy order từ query, mặc định là 'asc'
  
      const result = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: "images/", // Lọc tài nguyên trong thư mục 'images'
        resource_type: "image", // Chỉ lấy ảnh
      });
  
      // Sắp xếp kết quả dựa trên thời gian tải lên
      const sortedResources = result.resources.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return order === 'asc' ? timeA - timeB : timeB - timeA;
      });
  
      res.status(200).json({
        success: true,
        data: sortedResources, // Danh sách ảnh đã sắp xếp
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
  
  async getVideos(req, res) {
    try {
      const { order = 'asc' } = req.query; // Lấy order từ query, mặc định là 'asc'
  
      const result = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: "videos/", // Lọc tài nguyên trong thư mục 'videos'
        resource_type: "video", // Chỉ lấy video
      });
  
      // Sắp xếp kết quả dựa trên thời gian tải lên
      const sortedResources = result.resources.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return order === 'asc' ? timeA - timeB : timeB - timeA;
      });
  
      res.status(200).json({
        success: true,
        data: sortedResources, // Danh sách video đã sắp xếp
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
