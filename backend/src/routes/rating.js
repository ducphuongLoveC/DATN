import { Router } from "express";
import RatingController from "../controllers/RatingController.js";

const routerRating = Router();

// Đặt route "/all" trước route "/:course_id" để tránh bị trùng
routerRating.get("/all", RatingController.fetchAllRatings);  // Route này không có `course_id`
routerRating.get("/:course_id", RatingController.fetchRatings);  // Route này yêu cầu `course_id`
routerRating.post("/", RatingController.createRating);

export default routerRating;
