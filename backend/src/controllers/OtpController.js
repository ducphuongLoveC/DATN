import nodemailer from "nodemailer";
import crypto from "crypto";

import User from "../models/User.js";
import { EMAIL, PASSWORD } from "../utils/env.js";

console.log(EMAIL, PASSWORD);

class OTPController {

  constructor() {
    this.otpStore = {};

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD
      },
    });

    // Ràng buộc ngữ cảnh
    this.sendOTP = this.sendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }

  async sendOTP(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng cung cấp email!" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được đăng ký!" });
      }

      const otp = crypto.randomInt(100000, 999999);
      this.otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Mã OTP của bạn",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Mã OTP của bạn</h2>
            <p>Xin chào,</p>
            <p>Chúng tôi đã nhận được yêu cầu gửi mã OTP đến bạn. Sử dụng mã bên dưới để tiếp tục:</p>
            <div style="font-size: 24px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">Mã OTP này có hiệu lực trong <strong>5 phút</strong>. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <footer style="font-size: 14px; color: #aaa; text-align: center;">
              <p>Trân trọng,</p>
              <p><strong>Đội ngũ hỗ trợ của công ty bạn</strong></p>
              <p>Cần hỗ trợ? Liên hệ với chúng tôi tại <a href="mailto:duongducphuong68@gmail.com" style="color: #4CAF50;">duongducphuong68@gmail.com</a></p>
            </footer>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "OTP đã được gửi thành công!" });
    } catch (error) {
      console.error("Gửi OTP thất bại:", error);
      return res.status(500).json({ message: "Không thể gửi OTP" });
    }
  }

  verifyOTP(req, res) {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required!" });
    }

    const storedOtpData = this.otpStore[email];

    if (!storedOtpData) {
      return res.status(400).json({ message: "OTP not found for this email" });
    }

    if (storedOtpData.expiresAt < Date.now()) {
      delete this.otpStore[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (storedOtpData.otp.toString() !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    delete this.otpStore[email];
    return res.status(200).json({ message: "OTP verified successfully!" });
  }

  async sendResetPasswordOTP(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng cung cấp email!" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại!" });
      }

      const otp = crypto.randomInt(100000, 999999);
      this.otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Mã OTP để đặt lại mật khẩu",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Mã OTP để đặt lại mật khẩu</h2>
            <p>Xin chào,</p>
            <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu từ bạn. Sử dụng mã OTP dưới đây để tiếp tục:</p>
            <div style="font-size: 24px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">Mã OTP này có hiệu lực trong <strong>5 phút</strong>. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <footer style="font-size: 14px; color: #aaa; text-align: center;">
              <p>Trân trọng,</p>
              <p><strong>Đội ngũ hỗ trợ của công ty bạn</strong></p>
              <p>Cần hỗ trợ? Liên hệ với chúng tôi tại <a href="mailto:duongducphuong68@gmail.com" style="color: #4CAF50;">duongducphuong68@gmail.com</a></p>
            </footer>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "OTP để đặt lại mật khẩu đã được gửi thành công!" });
    } catch (error) {
      console.error("Gửi OTP thất bại:", error);
      return res.status(500).json({ message: "Không thể gửi OTP" });
    }
  }

  // Xác thực OTP cho việc lấy lại mật khẩu
  verifyResetPasswordOTP(req, res) {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email và OTP là bắt buộc!" });
    }

    const storedOtpData = this.otpStore[email];

    if (!storedOtpData) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy OTP cho email này" });
    }

    if (storedOtpData.expiresAt < Date.now()) {
      delete this.otpStore[email];
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    if (storedOtpData.otp.toString() !== otp) {
      return res.status(400).json({ message: "OTP không hợp lệ" });
    }

    delete this.otpStore[email];
    return res
      .status(200)
      .json({
        message: "Xác thực OTP thành công! Bạn có thể đặt lại mật khẩu.",
      });
  }
}

export default new OTPController();
