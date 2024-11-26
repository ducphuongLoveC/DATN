import { Router } from "express";
import NotificationController from "../controllers/NotificationController.js";

const routerNotification = Router();
routerNotification.get("/:id", NotificationController.getNotificationsByUserId);
routerNotification.patch("/:id", NotificationController.markAsRead);

export default routerNotification;
