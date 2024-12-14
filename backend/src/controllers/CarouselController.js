import Carousel from "../models/Carousel.js";

class CarouselController {
  // Tạo một carousel mới
  async create(req, res) {
    try {
      const { path, image, background, title, description } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!path || !image || !background || !title || !description) {
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin" });
      }

      const newCarousel = new Carousel({
        path,
        image,
        background,
        title,
        description,
      });
      await newCarousel.save();

      return res.status(201).json({
        success: true,
        data: newCarousel,
        message: "Carousel được tạo thành công",
      });
    } catch (error) {
      return res.status(500).json({
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

  // Cập nhật một carousel
  async update(req, res) {
    try {
      const { id } = req.params;
      const { path, image, background, title, description } = req.body;

      const updatedCarousel = await Carousel.findByIdAndUpdate(
        id,
        { path, image, background, title, description },
        { new: true }
      );

      if (!updatedCarousel) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy Carousel",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedCarousel,
        message: "Carousel được cập nhật thành công",
      });
    } catch (error) {
      return res.status(500).json({
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
