import axios from "axios";
import crypto from "crypto";
import Coupon from "../models/Coupon.js";
import { URL_REDIRECT_LEARNING, BASE_URL, URL_NGROK } from "../utils/env.js";

class PaymentContronller {
  async createPayment(req, res, next) {
    const { user_id, course_id, order_id, code, amount } = req.body;

    console.log("rq", req.body);

    // Kiểm tra thông tin đầu vào
    if (!user_id || !course_id || !order_id || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

    const requestId = partnerCode + new Date().getTime();
    const orderInfo = "pay with MoMo";
    const redirectUrl = `${URL_REDIRECT_LEARNING}/${course_id}`;
    const ipnUrl = `${URL_NGROK}/api/payment/callback`;

    const requestType = "payWithMethod";
    const extraData = JSON.stringify({
      userId: user_id,
      courseId: course_id,
      codeCoupon: code,
    });

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${order_id}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      userId: user_id,
      orderId: order_id,
      courseId: course_id,
      codeCoupon: code,

      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: "en",
      expiryTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log("Request Body:", requestBody);

    try {
      const result = await axios.post(
        `https://test-payment.momo.vn/v2/gateway/api/create`,
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return res.status(200).json(result.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      return res.status(500).json({
        statusCode: 500,
        message: "Error server",
        error: error.response ? error.response.data : error.message,
      });
    }
  }

  async callbackPayment(req, res) {
    console.log("Callback received");
    console.log(req.body);

    const { resultCode, orderId, extraData } = req.body;

    let userId, courseId, codeCoupon;
    if (extraData) {
      try {
        const parsedExtraData = JSON.parse(extraData);
        console.log("extra", parsedExtraData);

        userId = parsedExtraData.userId;
        courseId = parsedExtraData.courseId;
        codeCoupon = parsedExtraData.codeCoupon;
      } catch (error) {
        console.error("Error parsing extraData:", error);
        return res.status(400).send("Invalid extraData format");
      }
    }
    // cập nhật odder, khởi tạo progess với access khi thanh toán thành công
    if (resultCode === 0) {
      try {
        const expiration_date = new Date();
        expiration_date.setMonth(expiration_date.getMonth() + 1);

        const accessResponse = await axios.post(`${BASE_URL}/api/access`, {
          user_id: userId,
          course_id: courseId,
          expiration_date,
        });
        console.log("Access created:", accessResponse.data);

        const orderResponse = await axios.put(
          `${BASE_URL}/api/order/${orderId}/status`,
          {
            status: "completed",
          }
        );
        console.log("Order status updated:", orderResponse.data);

        if (codeCoupon) {
          const coupon = await Coupon.findOne({ code: codeCoupon });
          coupon.used_count += 1;
          await coupon.save();
        }

        res.status(200).send("Payment successful, order completed.");
      } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(400).send("Payment failed");
    }
  }
}

export default new PaymentContronller();
