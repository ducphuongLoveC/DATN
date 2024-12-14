import { Router } from "express";
import CarouselController from "../controllers/CarouselController.js";
import upload from "../middlewares/multer.js";

const routerCarousel = Router();

routerCarousel.get("/", CarouselController.getAll);
routerCarousel.get("/:id", CarouselController.getById);
routerCarousel.post("/", upload, CarouselController.create);
routerCarousel.put("/:id",upload, CarouselController.update);
routerCarousel.delete("/:id", CarouselController.delete);

export default routerCarousel;
