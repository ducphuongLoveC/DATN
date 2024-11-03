import cloudinary from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: 'dauyavqpr',
  api_key: '663283623232467',
  api_secret: 'h8EpbOZGM4V5dXUMgrq8rRGhOi4',
});

class TestUpload {
  // Hàm để tải lên video
  async uploadVideo(filePath) {
    try {
      const result = await cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'video', 
      });

      console.log('Video uploaded successfully:', result.secure_url);
      return result.secure_url; 
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error; 
    }
  }
}

// Sử dụng lớp TestUpload
const testUpload = new TestUpload();

// Gọi hàm uploadVideo với đường dẫn video cần tải lên
testUpload.uploadVideo('./video/cut.mp4')
  .then(url => {
    console.log('Uploaded video URL:', url);
  })
  .catch(err => {
    console.error('Upload failed:', err);
  });