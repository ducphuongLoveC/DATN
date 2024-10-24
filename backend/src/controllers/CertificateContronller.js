import Certificate from "../models/Certificate.js"

class CertificateContronller {
    async create(req, res, next) {
        try {
            const data = await Certificate.create(req.body)
            if (data) {
                return res.status(201).json({
                    success: true,
                    data,
                    message: "create successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const data = await Certificate.find().populate('user').populate('course')
            if(data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "get successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async getDetail(req,res,next) {
        try {
            const data = await Certificate.findById(req.params.id).populate('user').populate('course')
            if(data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "get detail successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next) {
        try {
            const data = await Certificate.findByIdAndDelete(req.params.id)
            if(data) {
                return res.status(200).json({
                    success: true,
                    data,
                    message: "delete successfuly"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const data = await Certificate.findByIdAndUpdate(
                {_id: req.params.id},
                {...req.body, updatedAt: new Date()},
                {new: true}
            )
            if (data) {
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

export default new CertificateContronller();
