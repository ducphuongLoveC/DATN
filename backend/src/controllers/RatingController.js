import express from "express";
import mongoose from "mongoose";
import Rating from "../models/Rating.js";

class RatingController {
  async fetchRatings(req, res) {
    const { course_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({ error: "Invalid course_id" });
    }

    try {
      const stats = await Rating.aggregate([
        { $match: { course_id: new mongoose.Types.ObjectId(course_id) } },
        {
          $group: {
            _id: "$course_id",
            totalRatings: { $sum: 1 },
            totalStars: { $sum: "$stars" },
            oneStar: { $sum: { $cond: [{ $eq: ["$stars", 1] }, 1, 0] } },
            twoStars: { $sum: { $cond: [{ $eq: ["$stars", 2] }, 1, 0] } },
            threeStars: { $sum: { $cond: [{ $eq: ["$stars", 3] }, 1, 0] } },
            fourStars: { $sum: { $cond: [{ $eq: ["$stars", 4] }, 1, 0] } },
            fiveStars: { $sum: { $cond: [{ $eq: ["$stars", 5] }, 1, 0] } },
          },
        },
      ]);

      const ratingsList = await Rating.aggregate([
        { $match: { course_id: new mongoose.Types.ObjectId(course_id) } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);

      if (stats.length === 0) {
        return res
          .status(404)
          .json({ message: "No ratings found for this course" });
      }

      res.status(200).json({
        stats: stats[0],
        ratings: ratingsList,
      });
    } catch (error) {
      console.error("Error fetching course ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createRating(req, res) {
    const { course_id, user_id, stars, comment } = req.body;

    // Kiểm tra tính hợp lệ của ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(course_id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return res.status(400).json({ error: "Invalid course_id or user_id" });
    }

    // Kiểm tra số sao hợp lệ
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ error: "Stars must be between 1 and 5" });
    }

    try {
      // Kiểm tra xem người dùng đã đánh giá khóa học này chưa
      const existingRating = await Rating.findOne({
        course_id,
        user_id,
      });

      if (existingRating) {
        return res
          .status(400)
          .json({ error: "User has already rated this course" });
      }

      // Tạo đánh giá mới nếu chưa tồn tại
      const newRating = new Rating({
        course_id,
        user_id,
        stars,
        comment,
      });

      await newRating.save();

      res
        .status(201)
        .json({ message: "Rating created successfully", rating: newRating });
    } catch (error) {
      console.error("Error creating rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async fetchAllRatings(req, res) {
    const { stars } = req.query; // Lấy giá trị lọc số sao từ query params
  
    // Kiểm tra giá trị stars (nếu có)
    if (stars && (isNaN(stars) || stars < 1 || stars > 5)) {
      return res
        .status(400)
        .json({ error: "Stars filter must be a number between 1 and 5" });
    }
  
    try {
      // Điều kiện lọc
      const matchCondition = {}; 
      if (stars) {
        matchCondition.stars = parseInt(stars, 10); // Chuyển stars về dạng số nguyên
      }
  
      // Lấy danh sách tất cả các đánh giá kèm thông tin người dùng
      const ratings = await Rating.aggregate([
        { $match: matchCondition }, // Lọc theo stars nếu có
        {
          $lookup: {
            from: "users", // Tên collection của User
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" }, // Gỡ bỏ mảng để trả về thông tin user dưới dạng object
      ]);
  
      // Nếu không có đánh giá nào
      if (ratings.length === 0) {
        return res
          .status(404)
          .json({ message: "No ratings found for the specified filters" });
      }
  
      // Trả về các đánh giá
      res.status(200).json(ratings);
    } catch (error) {
      console.error("Error fetching all ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
}
export default new RatingController();
