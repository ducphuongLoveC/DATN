import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Đường dẫn tạm thời
const tempDir = 'D:/TaiNguyenDoAnTotNghiep/UploadVideo/backend/controllers/tmp'; // Sử dụng đường dẫn tuyệt đối

// Tạo thư mục nếu nó chưa tồn tại
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true }); // Đảm bảo tạo các thư mục cha nếu cần
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir); // Đường dẫn tạm thời đã được cấu hình
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Giữ nguyên tên file gốc
    }
});

// Khởi tạo multer với cấu hình lưu trữ
const upload = multer({ storage: storage });

export default upload;
