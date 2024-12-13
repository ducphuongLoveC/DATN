import { Router } from "express";
import multer from "multer";
import CloudinaryController from "../controllers/CloudinaryController.js";

const upload = multer({ dest: 'uploads/' }); // Thư mục tạm để lưu file

const routerCloudinary = Router();
routerCloudinary.get("/images", CloudinaryController.getImages);
routerCloudinary.get("/videos", CloudinaryController.getVideos);

// Thêm route để upload ảnh
routerCloudinary.post("/upload", upload.single('file'), CloudinaryController.uploadImage);

export default routerCloudinary;