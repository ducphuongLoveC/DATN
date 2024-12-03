import dotenv from "dotenv";

dotenv.config({ path: "././.env.local" });

const {
  PORT,
  DB_URL,
  JWT_SECRET,
  CAPTCHA_SECRET,
  BASE_URL,
  BASE_URL_CLIENT,
  URL_REDIRECT_LEARNING,
  URL_NGROK,
  BASE_URL_ADMIN_CLIENT,
  EMAIL,
  PASSWORD,
} = process.env;

export {
  PORT,
  DB_URL,
  JWT_SECRET,
  CAPTCHA_SECRET,
  BASE_URL,
  BASE_URL_CLIENT,
  BASE_URL_ADMIN_CLIENT,
  URL_REDIRECT_LEARNING,
  URL_NGROK,
  EMAIL,
  PASSWORD,
};
