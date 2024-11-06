import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";

const routerPayment = Router();

routerPayment.post("/", PaymentController.createPayment);
routerPayment.post("/callback", PaymentController.callbackPayment);

export default routerPayment;
