import { Router } from "express";
import Auth from "../controllers/Auth.js";

const routerAuth = Router();
routerAuth.post('/register', Auth.register);
routerAuth.post('/login', Auth.login);
export default routerAuth;