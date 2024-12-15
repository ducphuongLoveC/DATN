import { Router } from "express";
import NotificationController from "../controllers/NotificationController.js";

const routerNotification = Router();
routerNotification.get("/:id", NotificationController.getNotificationsByUserId);
routerNotification.patch("/:id", NotificationController.markAsRead);

routerNotification.patch(
  "/mark-all-as-read/:id",
  NotificationController.markAllAsRead
);
routerNotification.delete(
  "/delete-all/:id",
  NotificationController.deleteAllNotificationsByUserId
);

export default routerNotification;
