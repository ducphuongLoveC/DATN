import Coupon from "../models/Coupon.js";
import User from "../models/User.js";
class CouponController {
  createCoupon = async (req, res) => {
    try {
      const {
        code,
        discount_type,
        discount_value,
        start_date,
        end_date,
        max_uses,
        course_ids,
      } = req.body;

      console.log(course_ids);

      const existingCoupon = await Coupon.findOne({ code });
      if (existingCoupon) {
        return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
      }
      const newCoupon = new Coupon({
        code,
        discount_type,
        discount_value,
        start_date,
        end_date: new Date(end_date),
        max_uses,
        course_ids,
      });

      await newCoupon.save();

      res
        .status(201)
        .json({ message: "Coupon created successfully", coupon: newCoupon });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error creating coupon", error: err.message });
    }
  };

  getAllCoupons = async (req, res) => {
    try {
      const { page = 1, limit = 5, order = "asc" } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
      const skip = (pageNumber - 1) * limitNumber;

      // Xác định thứ tự sắp xếp (asc: 1, desc: -1)
      const sortOrder = order === "asc" ? 1 : -1;

      const coupons = await Coupon.find()
        .populate("course_ids")
        .sort({ discount_value: sortOrder }) // Áp dụng sắp xếp
        .skip(skip)
        .limit(limitNumber)
        .exec();

      const result = coupons.map((coupon) => ({
        ...coupon.toObject(),
        courses: coupon.course_ids,
        course_ids: undefined,
      }));

      const totalCoupons = await Coupon.countDocuments();

      res.status(200).json({
        success: true,
        message: "Coupons retrieved successfully",
        data: result,
        totalCoupons,
        pagination: {
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCoupons / limitNumber),
          totalItems: totalCoupons,
          pageSize: limitNumber,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error retrieving coupons",
        error: error.message,
      });
    }
  };

  updateCoupon = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        code,
        discount_type,
        discount_value,
        start_date,
        end_date,
        max_uses,
        course_ids,
      } = req.body;

      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      if (max_uses !== undefined && max_uses < coupon.used_count) {
        return res.status(400).json({
          message: `Cannot set max_uses to ${max_uses}. It must be at least ${coupon.used_count}.`,
        });
      }

      if (code) coupon.code = code;
      if (discount_type) coupon.discount_type = discount_type;
      if (discount_value) coupon.discount_value = discount_value;
      if (start_date) coupon.start_date = new Date(start_date);
      if (end_date) coupon.end_date = new Date(end_date);
      if (max_uses) coupon.max_uses = max_uses;
      if (course_ids) coupon.course_ids = course_ids;

      await coupon.save();

      res.status(200).json({
        message: "Coupon updated successfully",
        coupon,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error updating coupon", error: err.message });
    }
  };

  deleteCoupon = async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error deleting coupon", error: err.message });
    }
  };

  getCouponsByCourseId = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Course ID không được để trống.",
        });
      }
      const coupons = await Coupon.find({ course_ids: id });

      if (coupons.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy mã giảm giá nào cho khóa học này.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Danh sách mã giảm giá được lấy thành công.",
        data: coupons,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách mã giảm giá.",
        error: error.message,
      });
    }
  };

  applyCoupon = async (req, res) => {
    try {
      const { code, course_id, price } = req.body;

      const coupon = await Coupon.findOne({ code });
      if (!coupon) {
        return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
      }

      const now = new Date();
      if (coupon.start_date > now || coupon.end_date < now) {
        return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
      }

      if (coupon.used_count >= coupon.max_uses) {
        await Coupon.findByIdAndDelete(coupon._id);
      } else {
        await coupon.save();
      }

      if (
        coupon.course_ids.length > 0 &&
        !coupon.course_ids.includes(course_id)
      ) {
        return res
          .status(400)
          .json({ message: "Mã giảm giá không áp dụng cho khóa học này" });
      }

      let discountedPrice = price;
      if (coupon.discount_type === "percentage") {
        discountedPrice = price - (price * coupon.discount_value) / 100;
      } else if (coupon.discount_type === "fixed_amount") {
        discountedPrice = price - coupon.discount_value;
      }

      discountedPrice = Math.max(discountedPrice, 0);

      res.status(200).json({
        success: true,
        message: "Áp dụng mã giảm giá thành công",
        data: {
          code: coupon.code,
          price,
          discountedPrice,
          discount: price - discountedPrice,
          discount_value: coupon.discount_value,
          discount_type: coupon.discount_type,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi áp dụng mã giảm giá",
        error: error.message,
      });
    }
  };
}
export default new CouponController();
