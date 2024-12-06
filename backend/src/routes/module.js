import { Router } from "express";
import ModuleController from "../controllers/ModuleController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { moduleSchema } from "../validSchema/moduleSchema.js";
import { checkAuth, checkRoles } from "../middlewares/checkAuth.js";

const routerModule = Router();

routerModule.get("/", ModuleController.getAllModules);
// routerModule.get("/:id/module-resources", ModuleController.getModulesWithResources);
routerModule.get("/:id/:user_id/module-resources", ModuleController.getModulesWithResources);


routerModule.post("/", validBodyRequets(moduleSchema), ModuleController.createModule);
routerModule.patch("/:id", validBodyRequets(moduleSchema), ModuleController.updateModule);

routerModule.use('/', checkAuth,  checkRoles(['admin']))
routerModule.delete("/:id", ModuleController.deleteModule);

export default routerModule;
