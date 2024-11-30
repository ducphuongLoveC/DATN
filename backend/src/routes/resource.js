import { Router } from "express";
import ResourceController from "../controllers/ResourceController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";

const routerResource = Router();

// routerResource.get("/:course_id/:id?", ResourceController.getResource);
routerResource.get("/progress/:course_id/:user_id/:id?", ResourceController.getResource);

routerResource.get(
  "/:id/adjacent/id",
  ResourceController.getAdjacentResourceId
);

export default routerResource;
