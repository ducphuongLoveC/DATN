import { Router } from "express";
import RatingController from "../controllers/RatingController.js";

const routerRating = Router();

routerRating.get("/:course_id", RatingController.fetchRatings);
routerRating.post("/", RatingController.createRating);

export default routerRating;
