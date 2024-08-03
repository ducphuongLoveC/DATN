import express, { json } from 'express';
import cors from 'cors';
import router from '../routes/index.js';

// import multer from 'multer';
// import fs from 'fs';
// import { Vimeo } from 'vimeo';

// import path from 'path';
// import { fileURLToPath } from 'url';

// Lấy đường dẫn của tệp hiện tại
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Cấu hình CORS
app.use(cors());

app.use('/api', router);


// Thay thế bằng thông tin của bạn
// const client_id = '7188af56f1e059699930ea0175ecad81f1d84f28';
// const client_secret = 'VN/2XBf6jI23UUmZScNiGolWUU/+l0nYaa0h6E0un3oNOf99k1n7SFhfvWn/pCZHk04L7SBCHluPNmQv/i0jl3dNMpN/qNsPgCVvt6BjAd0dF1yvgJMUpd//yYjuyrP7';
// const access_token = 'd1d4bd4410a2bfb4282120df550bea21';

// Khởi tạo Vimeo client
// const vimeoClient = new Vimeo(client_id, client_secret, access_token);

// Đặt thư mục tạm thời
// const tempDir = path.join(__dirname, 'tmp');

// Tạo thư mục tạm thời nếu nó chưa tồn tại
// if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir, { recursive: true });
// }

// Cấu hình multer để lưu trữ file trong bộ nhớ
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Route để upload video lên Vimeo
// app.post('/upload', upload.single('video'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const fileBuffer = req.file.buffer;
//     const fileName = req.file.originalname;
//     const tempFilePath = path.join(tempDir, fileName);

//     console.log('Received file:', req.file); // Log thông tin file nhận được

//     // Tạo một file tạm thời từ buffer và upload lên Vimeo
//     fs.writeFile(tempFilePath, fileBuffer, (err) => {
//         if (err) {
//             console.error('Error saving temporary file:', err);
//             return res.status(500).send('Error saving temporary file.');
//         }

//         // Tải video lên Vimeo
//         vimeoClient.upload(tempFilePath, {
//             upload: {
//                 approach: 'tus',
//                 size: req.file.size
//             }
//         }, (uri) => {
//             console.log('Upload success:', uri); // Log thành công

//             // Xóa video tạm thời sau khi upload xong
//             fs.unlink(tempFilePath, (unlinkErr) => {
//                 if (unlinkErr) {
//                     console.error('Error deleting temporary file:', unlinkErr);
//                 }
//             });

//             // Lấy thông tin video từ Vimeo
//             const videoId = uri.split('/').pop(); // Extract video ID

//             vimeoClient.request({
//                 method: 'GET',
//                 path: `/videos/${videoId}`
//             }, (error, body) => {
//                 if (error) {
//                     console.error('Failed to retrieve video details:', error);
//                     return res.status(500).send('Failed to retrieve video details');
//                 }
//                 console.log(body);
//                 // Trả về thông tin video, bao gồm ảnh bìa
//                 res.send({
//                     message: 'Video uploaded successfully!',
//                     uri: uri,
//                     thumbnail: body.pictures.sizes[body.pictures.sizes.length - 1].link
//                 });
//             }
//             );
//         }, (bytes, length) => {
//             // Tiến trình upload
//             console.log(`${bytes} of ${length}`);
//         }, (error) => {
//             console.error('Upload failed:', error); // Log lỗi
//             res.status(500).send('Upload failed: ' + error.message);
//         });
//     });
// });


// Route để lấy video từ Vimeo
// app.get('/video/:videoId', (req, res) => {
//     const videoId = req.params.videoId;

//     vimeoClient.request({
//         method: 'GET',
//         path: `/videos/${videoId}`
//     }, (error, body, status_code, headers) => {
//         if (error) {
//             console.error('Retrieve video failed:', error); // Log lỗi
//             res.status(500).send('Failed to retrieve video');
//         } else {
//             res.json(body);
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
