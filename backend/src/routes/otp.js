import { Router } from "express";
import OtpController from "../controllers/OtpController.js";

const routerOtp = Router();

routerOtp.post("/send", OtpController.sendOTP);
routerOtp.post("/verify", OtpController.verifyOTP);

export default routerOtp;
