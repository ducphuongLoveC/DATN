import { Router } from "express";
import CloudinaryController from "../controllers/cloudinaryController.js";

const routerCloudinary = Router();
routerCloudinary.get("/images", CloudinaryController.getImages);
routerCloudinary.get("/videos", CloudinaryController.getVideos);

export default routerCloudinary;
