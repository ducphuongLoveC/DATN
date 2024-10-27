import Joi from "joi";

export const moduleSchema = Joi.object({
    course_id: Joi.string().required().messages({
        "string.base": "Course ID must be a string",
        "string.empty": "Course ID cannot be empty",
    }),
    title: Joi.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
    }),
    status: Joi.string().valid('active', 'inactive').required().messages({
        "string.base": "Status must be a string",
        "string.empty": "Status cannot be empty",
        "any.only": "Status must be either 'active' or 'inactive'",
    }),
});
