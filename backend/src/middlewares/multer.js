import multer from 'multer';
import path from 'path';

// Cấu hình lưu trữ tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu trữ file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newFileName = `${Date.now()}${ext}`;
    cb(null, newFileName);
  },
});

// Cấu hình nhận nhiều file
const upload = multer({
  storage: storage,
}).any();

export default upload;
