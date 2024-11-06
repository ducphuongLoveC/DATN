import { Router } from "express";

import CaptchaController from "../controllers/CaptchaController.js";

const routerCaptcha = Router();
routerCaptcha.post('/verify', CaptchaController.verifyCaptcha);


export default routerCaptcha;