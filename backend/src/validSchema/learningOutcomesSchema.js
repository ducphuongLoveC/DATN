import Joi from "joi";

export const learningOutcomes = Joi.object({
    title: Joi.string().required().min(6).max(30).messages({
        "string.base": "Title must be a string",
        "string.empty": "Title can not be empty",
        "string.min": "Title must have at least 6 character",
        "string.max": "Title must have at most 255 character",
    }),
    course: Joi.string().messages({
        "string.base": "Course must be a string",

    })
})