import LearningOutcomes from "../models/LearningOutcomes.js"
class LearningOutcome {
    async create(req, res, next) {
        try {
            const data = await LearningOutcomes.create(req.body)
            if (data) {
                return res.status(201).json({
                    success: true,
                    data,
                    message: "create successfuly"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const data = await LearningOutcomes.find()
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "get successfuly"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    async getDetail(req, res, next) {
        try {
            const data = await LearningOutcomes.findById(req.params.id)
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "getDetail successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = await LearningOutcomes.findByIdAndDelete(req.params.id)
            if (data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "delele successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next) {
        try {
            const data = await LearningOutcomes.findByIdAndUpdate(
                {_id: req.params.id},
                {...req.body, updatedAt: new Date()},
                {new: true}
            )
            if(data){
                return res.status(200).json({
                    success: true,
                    data,
                    message: "update successfuly"
                })
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

export default new LearningOutcome()