const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// client gửi yêu cầu thanh toán đến api "/payment" này sẽ được trả về 1 link thanh toán client tiếp
// nhận link toán đấy rồi redirect 
app.post('/payment', async (req, res) => {
    const partnerCode = "MOMO"; // Mã đối tác của bạn với MoMo
    const accessKey = "F8BBA842ECF85"; // Khóa truy cập của bạn với MoMo
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"; // Khóa bí mật của bạn với MoMo

    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "pay with MoMo";
    const redirectUrl = "https://youtube.com"; // URL chuyển hướng sau khi thanh toán thành công
    const ipnUrl = "https://33db-117-0-114-59.ngrok-free.app/callback"; // URL callback để nhận thông báo thanh toán

    const amount = "500000"; // Số tiền cần thanh toán
    const requestType = "payWithATM"; // Loại yêu cầu thanh toán
    const bankCode = "SACOMBANK"; // Mã ngân hàng nội địa
    const extraData = ""; // Thông tin thêm

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        // gửi đi sinature để api của momo so sánh có bảo toàn dữ liệu hay miss trường dữ liệu nào không
        signature: signature,
        lang: 'en'
    };

    console.log("Request Body:", requestBody);

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody
    };

    try {
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            statusCode: 500,
            message: 'Error server',
            error: error.response ? error.response.data : error.message
        });
    }
});

// khi thực hiện thành toán/ cancel thanh toán momo sẽ gọi lại api này
app.post('/callback', (req, res) => {
    console.log('Callback received');
    console.log(req.body);
    // ví dụ momo sẽ gửi dữ liệu như này: resultCode ==0 là thanh toán thành công, khác 0 ngược lại
    // partnerCode: 'MOMO',
    // orderId: 'MOMO1721561524545',
    // requestId: 'MOMO1721561524545',
    // amount: 500000,
    // orderInfo: 'pay with MoMo',
    // orderType: 'momo_wallet',
    // transId: 4088404302,
    // resultCode: 0,
    // message: 'Successful.',
    // payType: 'napas',
    // responseTime: 1721561589022,
    // extraData: '',
    // signature: 'f0bbf727fbd30ee1b2a6cb4397c6919a941595ed83bafd9ee1f16cd176105f64'
    // Xử lý logic cập nhật trạng thái đơn hàng của bạn ở đây
    res.status(200).send('Received');
});

app.listen(5000, () => {
    console.log('Server running at port 5000!');
});
