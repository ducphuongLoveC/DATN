import Course from "../models/Course.js"
import LearningOutcomes from "../models/LearningOutcomes.js";
import LearningPath from "../models/LearningPath.js";

class CoursesController {

    async create(req, res, next) {
        try {
            const data = await Course.create(req.body);
            console.log(data);
    
            if (data) {
                const updateLearningPath = await LearningPath.findByIdAndUpdate(
                    req.body.learning_path,
                    {
                        $push: { course: data._id }
                    },
                    { new: true }
                );
    
                // Tìm và cập nhật hoặc tạo mới trong bảng LearningOutcomes
                const updateLearningOutcome = await LearningOutcomes.findOneAndUpdate(
                    { _id: req.body.learningOutcomes }, // Điều kiện tìm kiếm dựa trên learningOutcomesId
                    {
                        $set: { ...req.body.learningOutcomes }, // Cập nhật dữ liệu LearningOutcomes
                        $set: { course: data._id } // Đẩy ID khoá học vào mảng course
                    },
                    { upsert: true, new: true } // Tạo mới nếu không tìm thấy, trả về tài liệu mới sau khi cập nhật
                );
    
                if (data && updateLearningPath && updateLearningOutcome) {
                    return res.status(201).json({
                        success: true,
                        data,
                        message: "Course created/updated successfully"
                    });
                }
            }
            next();
        } catch (error) {
            next(error);
        }
    }
    
    async get(req, res, next) {
        try {
            const data = await Course.find().populate('learningOutcomes').populate('learning_path')
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "get Learning Path successfuly"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    async getDetail(req, res, next) {
        try {
            const data = await Course.findById(req.params.id).populate('learningOutcomes').populate('learning_path')
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "getDetail Learning Path successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async detete(req, res, next) {
        try {
            const data = await Course.findByIdAndDelete(req.params.id)
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "delete Learning Path successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const data = await Course.findByIdAndUpdate(
                { _id: req.params.id },
                { ...req.body, updatedAt: new Date() },
                { new: true }
            )

            if(data){
                return res.status(200).json({
                    success: true,
                    data,
                    message: "update Learning Path successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
export default new CoursesController;