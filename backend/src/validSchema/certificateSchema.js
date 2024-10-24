import Joi from "joi";

export const certificateSchema = Joi.object({
    user: Joi.string().required().messages({
        "string.base": "User must be a string",
        "string.empty": "User can not be empty",

    }),
    course: Joi.string().required().messages({
        "string.base": "Course must be a string",
        "string.empty": "Course can not be empty",
    }),
    issued_date: Joi.date().required().messages({
        "date.base": "Issued date must be a date",
        "string.empty": "Issued date can not be empty",
    })
})