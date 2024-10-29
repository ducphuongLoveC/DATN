import Joi from "joi";

export const courseSchema = Joi.object({
  learning_path: Joi.string().required().messages({
    "string.base": "Learning path must be a string",
    "string.empty": "Learning path can not be empty",
  }),
  user: Joi.string().required().messages({
    "string.base": "User must be a string",
    "string.empty": "User can not be empty",
  }),
  title: Joi.string().required().min(6).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title can not be empty",
    "string.min": "Title must have at least 6 character",
  }),
  level: Joi.string().messages({
    "string.base": "Level must be a string",
  }),
  learningOutcomes: Joi.string().required().messages({
    "string.base": "Learning Outcomes must be a string",
    "string.empty": "Learning Outcomes can not be empty",
  }),
  thumbnail: Joi.string().required().min(6).max(255).messages({
    "string.base": "Thumbnail must be a string",
    "string.empty": "Thumbnail can not be empty",
    "string.min": "Thumbnail must have at least 6 character",
    "string.max": "Thumbnail must have at most 255 character",
  }),
  description: Joi.string().max(255).messages({
    "string.base": "Description must be a string",
    "string.max": "Description must have at most 255 character",
  }),
  original_price: Joi.number().required().min(1).messages({
    "number.base": "Price must be a number",
    "number.empty": "Price can not be empty",
    "number.min": "Price minium values > 0",
  }),
  sale_price: Joi.number().required().min(1).messages({
    "number.base": "Price must be a number",
    "number.empty": "Price can not be empty",
    "number.min": "Price minium values > 0",
  })
});