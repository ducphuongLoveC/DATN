import Joi from "joi";

export const learningPathSchema = Joi.object({
  title: Joi.string().required().min(6).max(30).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title can not be empty",
    "string.min": "Title must have at least 6 character",
    "string.max": "Title must have at most 255 character",
  }),
  description: Joi.string().max(255).messages({
    "string.base": "Description must be a string",
    "string.max": "Description must have at most 255 character",
  }),
});
