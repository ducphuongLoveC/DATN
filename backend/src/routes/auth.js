import { Router } from "express";
import Auth from "../controllers/Auth.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { userSchema } from "../validSchema/userSchema.js";

const routerAuth = Router();
routerAuth.use('/', validBodyRequets(userSchema))
routerAuth.post('/register', Auth.register);
routerAuth.post('/login', Auth.login);

export default routerAuth;
