import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Course from '../models/Course.js';
import axios from 'axios';
import { ObjectId } from 'mongodb';


class CourseController {

    constructor() {
        this.getCourse = this.getCourse.bind(this);
    }
    // getAllCourse 
    async CourseList(req, res) {
        try {
            const courses = await Course.find({});
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).send('Error fetching Courses.');
        }
    }
    async getCourse(req, res) {
        try {
            const id = req.params.id;

            const course = await Course.findById(id);

            if (!course) {
                return res.status(404).send('Course not found.');
            }

            // Lấy URL video từ Vimeo
            const video = await this.getVideoBlob(course.videoId);

            const newCourse = { ...course.toObject(), video }

            console.log(newCourse);

            res.status(200).json(newCourse);
        } catch (error) {
            console.error('Error fetching course:', error);
            res.status(500).send('Error fetching course.');
        }
    }

    async CourseUpload(req, res) {
        const newId = new ObjectId(); // Tạo ObjectId mới cho video

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const tempDir = path.join(__dirname, 'tmp');
        const publicCourseDir = path.join(__dirname, `../uploads/courses/${newId}/`);
        const publicThumbnailsDir = path.join(__dirname, '../uploads/course_thumbnail/');
        const { title, thumbnail, description } = req.body;

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = path.join(tempDir, req.file.filename);

        try {
            // Tạo thư mục public nếu chưa tồn tại
            if (!fs.existsSync(publicCourseDir)) {
                fs.mkdirSync(publicCourseDir, { recursive: true });
            }
            if (!fs.existsSync(publicThumbnailsDir)) {
                fs.mkdirSync(publicThumbnailsDir, { recursive: true });
            }

            // Di chuyển video từ thư mục tạm đến thư mục public
            const nameVideo = req.file.filename.split('.')[0];
            const destinationPath = path.join(publicCourseDir, `${nameVideo}.mp4`);
            fs.rename(filePath, destinationPath, async (err) => {
                if (err) {
                    console.error('Error moving video file:', err);
                    return res.status(500).send('Error saving video file.');
                }

                console.log('Video saved:', destinationPath);

                // Lấy dữ liệu thumbnail từ URL
                try {
                    const thumbnailResponse = await axios.get(thumbnail, { responseType: 'arraybuffer' });
                    const thumbnailFilePath = path.join(publicThumbnailsDir, `${title}.jpeg`);

                    // Lưu ảnh thumbnail vào thư mục public
                    fs.writeFile(thumbnailFilePath, Buffer.from(thumbnailResponse.data), async (err) => {
                        if (err) {
                            console.error('Error saving thumbnail:', err);
                            return res.status(500).send('Error saving thumbnail.');
                        }

                        console.log('Thumbnail saved:', thumbnailFilePath);

                        // Thêm khóa học vào cơ sở dữ liệu
                        try {
                            await Course.updateOne(
                                { _id: newId }, // Sử dụng newId làm _id
                                {
                                    $set: {
                                        video: newId.toString(),
                                        title,
                                        description,
                                        thumbnail: `${newId}.jpg`
                                    }
                                },
                                { upsert: true } // tạo mới nếu chưa có
                            )

                            res.send({ message: 'Video uploaded successfully!', videoPath: destinationPath });
                        } catch (dbError) {
                            console.error('Error updating database:', dbError);
                            res.status(500).send('Error updating database.');
                        }
                    });
                } catch (thumbnailError) {
                    console.error('Failed to retrieve thumbnail:', thumbnailError);
                    res.status(500).send('Failed to retrieve thumbnail.');
                }
            });
        } catch (error) {
            console.error('Failed to process upload:', error);
            res.status(500).send('Failed to process upload.');
        }
    }

}

export default new CourseController();
