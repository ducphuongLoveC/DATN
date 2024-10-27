import Joi from "joi";

export const accessSchema = Joi.object({
    user: Joi.string().required().messages({
        "string.base": "User must be a string",
        "string.empty": "User can not be empty",

    }),
    course: Joi.string().required().messages({
        "string.base": "Course must be a string",
        "string.empty": "Course can not be empty",
    }),
    access_date: Joi.date().messages({
        "date.base": "Access date date must be a date",
    }),
    expiration_date: Joi.date().messages({
        "date.base": "Expiration date date must be a date",
    })
})