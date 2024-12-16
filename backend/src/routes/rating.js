import { Router } from "express";
import RatingController from "../controllers/RatingController.js";

const routerRating = Router();


routerRating.get("/all", RatingController.fetchAllRatings);  // Route này không có `course_id`
routerRating.get("/:course_id", RatingController.fetchRatings);  // Route này yêu cầu `course_id`
routerRating.post("/", RatingController.createRating);

export default routerRating;
