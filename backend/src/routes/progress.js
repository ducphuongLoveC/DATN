import { Router } from "express";
import ProgressController from "../controllers/ProgressController.js";

const routerProgress = Router();

// Bắt đầu khóa học và tạo tiến độ cho resource đầu tiên
routerProgress.post("/start", ProgressController.startResource);

routerProgress.patch(
  "/:user_id/:resource_id/complete",
  ProgressController.completeResource
);

export default routerProgress;
