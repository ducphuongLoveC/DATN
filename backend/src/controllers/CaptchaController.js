import axios from "axios";
import { CAPTCHA_SECRET } from "../utils/env.js";

class CapchaController {
  async verifyCaptcha(req, res, next) {
    const token = req.body.token;
    console.log(token);
    console.log(CAPTCHA_SECRET);

    try {
      const params = new URLSearchParams();
      params.append('secret', CAPTCHA_SECRET);
      params.append('response', token);

      const { data } = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        params, 
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (data.success) {
        res.json({ success: true });
      } else {
        res.json({ success: false, "error-codes": data["error-codes"] });
      }
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
      next(error);
    }
  }
}

export default new CapchaController();
