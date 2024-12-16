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
        { $sort: { createdAt: -1 } },
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


  // async fetchRatings(req, res) {
  //   const { course_id } = req.params;
  //   const { star } = req.query; // Lấy `star` từ query params

  //   if (!mongoose.Types.ObjectId.isValid(course_id)) {
  //     return res.status(400).json({ error: "Invalid course_id" });
  //   }

  //   try {
  //     // Tạo stage match để lọc đánh giá theo `course_id`
  //     const matchStage = { course_id: new mongoose.Types.ObjectId(course_id) };

  //     // Nếu có giá trị `star`, lọc theo số sao
  //     if (star) {
  //       const starNumber = parseInt(star);
  //       if (starNumber >= 1 && starNumber <= 5) {
  //         matchStage.stars = starNumber; // Lọc theo số sao
  //       } else {
  //         return res.status(400).json({ error: "Invalid star value" });
  //       }
  //     }

  //     // Tính toán thống kê về các đánh giá (không lọc theo star ở đây)
  //     const stats = await Rating.aggregate([
  //       { $match: { course_id: new mongoose.Types.ObjectId(course_id) } }, // Lọc theo course_id
  //       {
  //         $group: {
  //           _id: "$course_id",
  //           totalRatings: { $sum: 1 },
  //           totalStars: { $sum: "$stars" },
  //           oneStar: { $sum: { $cond: [{ $eq: ["$stars", 1] }, 1, 0] } },
  //           twoStars: { $sum: { $cond: [{ $eq: ["$stars", 2] }, 1, 0] } },
  //           threeStars: { $sum: { $cond: [{ $eq: ["$stars", 3] }, 1, 0] } },
  //           fourStars: { $sum: { $cond: [{ $eq: ["$stars", 4] }, 1, 0] } },
  //           fiveStars: { $sum: { $cond: [{ $eq: ["$stars", 5] }, 1, 0] } },
  //         },
  //       },
  //     ]);

  //     // Lấy danh sách đánh giá (có thể lọc theo star nếu có)
  //     const ratingsList = await Rating.aggregate([
  //       { $match: matchStage }, // Lọc theo course_id và star nếu có
  //       {
  //         $lookup: {
  //           from: "users",
  //           localField: "user_id",
  //           foreignField: "_id",
  //           as: "user",
  //         },
  //       },
  //       { $unwind: "$user" },
  //     ]);

  //     // Nếu không có đánh giá nào, vẫn trả về stats
  //     if (stats.length === 0) {
  //       return res.status(200).json({
  //         stats: {
  //           _id: course_id,
  //           totalRatings: 0,
  //           totalStars: 0,
  //           oneStar: 0,
  //           twoStars: 0,
  //           threeStars: 0,
  //           fourStars: 0,
  //           fiveStars: 0,
  //         },
  //         ratings: [],
  //       });
  //     }

  //     // Trả kết quả về client
  //     res.status(200).json({
  //       stats: stats[0],
  //       ratings: ratingsList,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching course ratings:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // }

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
    const { stars } = req.query;

    if (stars && (isNaN(stars) || stars < 1 || stars > 5)) {
      return res
        .status(400)
        .json({ error: "Stars filter must be a number between 1 and 5" });
    }

    try {
      const matchCondition = {};
      if (stars) {
        matchCondition.stars = parseInt(stars, 10);
      }

      const ratings = await Rating.aggregate([
        { $match: matchCondition },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "courses",
            localField: "course_id",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            stars: 1,
            comment: 1,
            createdAt: 1,
            user: { _id: 1, name: 1, email: 1, profile_picture: 1 },
            course: { _id: 1, title: 1 },
          },
        },
      ]);

      if (ratings.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(ratings);
    } catch (error) {
      console.error("Error fetching all ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new RatingController();
