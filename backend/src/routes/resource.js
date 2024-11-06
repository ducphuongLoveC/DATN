import { Router } from "express";
import ResourceController from "../controllers/ResourceController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";

const routerResource = Router();

routerResource.get("/:id?", ResourceController.getResource);
routerResource.get(
  "/:id/adjacent-id",
  ResourceController.getAdjacentResourceId
);

export default routerResource;
