import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { userSchema } from "../validSchema/userSchema.js";

const routerUser = Router();
routerUser.get("/", UserController.get);

export default routerUser;
