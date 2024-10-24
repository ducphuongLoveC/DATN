import Course from "../models/Course.js"
import LearningOutcomes from "../models/LearningOutcomes.js";
import LearningPath from "../models/LearningPath.js";

class CoursesController {

    async create(req, res, next) {
        try {
            const data = await Course.create(req.body)
            console.log(data);

            if (data) {
                const updateLearningPath = await LearningPath.findByIdAndUpdate(
                    req.body.learning_path,
                    {
                        $push: { course: data._id }
                    },
                    { new: true }
                )

                const updateLearningOutcome = await LearningOutcomes.findByIdAndUpdate(
                    req.body.learningOutcomes,
                    {
                        $push: { course: data._id }
                    },
                    { new: true }
                )

                if (data && updateLearningPath && updateLearningOutcome) {
                    return res.status(201).json({
                        success: true,
                        data,
                        message: "create Course successfuly"
                    })
                }
            }
            next()

        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const data = await Course.find().populate('learningOutcomes')
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
            const data = await Course.findById(req.params.id)
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