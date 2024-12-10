import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../utils/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

/**
 * Hàm gửi email
 * @param {string} toEmail - Địa chỉ email người nhận
 * @param {string} subject - Tiêu đề email
 * @param {string} htmlContent - Nội dung email dạng HTML
 */
export const sendEmail = async (toEmail, subject, htmlContent) => {
  const mailOptions = {
    from: `Your Store"`,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent successfully to ${toEmail}`);
};
