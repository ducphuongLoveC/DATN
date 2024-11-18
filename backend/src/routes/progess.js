import { Router } from "express";
import ProgressController from "../controllers/ProgessController.js";

const routerProgess = Router();

routerProgess.get("/", ProgressController.createOrGetProgress);
routerProgess.get("/:id/update", ProgressController.updateProgress);

export default routerProgess;
