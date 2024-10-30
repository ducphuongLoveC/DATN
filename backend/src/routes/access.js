import { Router } from "express";
import AccessController from "../controllers/AccessController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { accessSchema } from "../validSchema/accessSchema.js";

const routerAccess = Router();
routerAccess.get("/", AccessController.get);
routerAccess.get("/:id", AccessController.getDetail);
routerAccess.post("/",validBodyRequets(accessSchema), AccessController.create);
routerAccess.patch("/:id",validBodyRequets(accessSchema), AccessController.update);
routerAccess.delete("/:id", AccessController.delete);

export default routerAccess;
