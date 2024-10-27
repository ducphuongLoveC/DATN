import { Router } from "express";
import ModuleController from "../controllers/ModuleController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { moduleSchema } from "../validSchema/moduleSchema.js";

const routerModule = Router();

routerModule.get("/", ModuleController.getAllModules);
routerModule.post("/", validBodyRequets(moduleSchema), ModuleController.createModule);
routerModule.patch("/:id", validBodyRequets(moduleSchema), ModuleController.updateModule);
routerModule.delete("/:id", ModuleController.deleteModule);

export default routerModule;