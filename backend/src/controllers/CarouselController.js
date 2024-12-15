import Carousel from "../models/Carousel.js";
import cloudinary from "cloudinary";
import fs from "fs";

class CarouselController {
  async create(req, res) {
    try {
      const { path, background, title, description } = req.body;
  
      // Kiểm tra các trường bắt buộc
      if (!path || !background || !title || !description) {
        return res.status(400).json({ message: "Các trường bắt buộc không được bỏ trống" });
      }
  
      // Kiểm tra số lượng carousel hiện tại
      const carouselCount = await Carousel.countDocuments();
      if (carouselCount >= 10) {
        return res.status(400).json({
          success: false,
          message: "Đã đạt giới hạn 10 carousel, không thể tạo thêm",
        });
      }
  
      let imageUrl;
  
      // Kiểm tra xem có file được upload không
      if (req.files) {
        const imageFile = req.files.find((file) => file.fieldname === "image");
  
        if (imageFile) {
          // Upload file lên Cloudinary
          const uploadedImage = await cloudinary.v2.uploader.upload(imageFile.path, { folder: "carousel" });
          imageUrl = uploadedImage.secure_url;
  
          // Xóa file trong thư mục uploads
          fs.unlink(imageFile.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        } else {
          return res.status(400).json({ message: "Không tìm thấy file ảnh" });
        }
      } else if (req.body.image) {
        imageUrl = req.body.image;
      } else {
        return res.status(400).json({ message: "Hình ảnh không được cung cấp" });
      }
  
      // Tạo carousel mới
      const newCarousel = new Carousel({ path, image: imageUrl, background, title, description });
  
      // Lưu vào database
      await newCarousel.save();
  
      res.status(201).json({
        success: true,
        data: newCarousel,
        message: "Carousel được tạo thành công",
      });
    } catch (error) {
      console.error("Error creating carousel:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }
  
  

  // Lấy danh sách tất cả các carousel
  async getAll(req, res) {
    try {
      const carousels = await Carousel.find();

      // Kiểm tra nếu không có carousel nào
      if (carousels.length === 0) {
        return res.status(204).json({
          // Trả về 204 thay vì 404 nếu không có dữ liệu
          success: false,
          message: "Không có carousel nào",
        });
      }

      return res.status(200).json({
        success: true,
        data: carousels,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Lấy một carousel theo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const carousel = await Carousel.findById(id);

      if (!carousel) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy Carousel",
        });
      }

      return res.status(200).json({
        success: true,
        data: carousel,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { path, background, title, description, image: currentImage } = req.body;
  
      // Kiểm tra các trường bắt buộc
      if (!path || !background || !title || !description) {
        return res.status(400).json({ message: "Các trường bắt buộc không được bỏ trống" });
      }
  
      let imageUrl = currentImage;
  
      // Kiểm tra xem có file ảnh mới được upload không
      if (req.files) {
        const imageFile = req.files.find((file) => file.fieldname === "image");
        if (imageFile) {
          // Upload ảnh mới lên Cloudinary
          const uploadedImage = await cloudinary.v2.uploader.upload(imageFile.path, { folder: "carousel" });
          imageUrl = uploadedImage.secure_url;
  
          // Xóa file trong thư mục uploads
          fs.unlink(imageFile.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        }
      }
  
      // Cập nhật carousel
      const updatedCarousel = await Carousel.findByIdAndUpdate(
        id,
        { path, image: imageUrl, background, title, description },
        { new: true }
      );
  
      if (!updatedCarousel) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy Carousel",
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedCarousel,
        message: "Carousel được cập nhật thành công",
      });
    } catch (error) {
      console.error("Error updating carousel:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }
  

  // Xóa một carousel
  async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedCarousel = await Carousel.findByIdAndDelete(id);

      if (!deletedCarousel) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy Carousel",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Carousel đã được xóa thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }
}

export default new CarouselController();
