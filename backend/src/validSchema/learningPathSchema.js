import Joi from "joi";

export const learningPathSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).messages({
    "string.base": "Title phải là chuỗi",
    "string.empty": "Title không được để trống",
    "string.min": "Title phải từ 3 ký tự trở lên",
    "string.max": "Title tối đa là 30 ký tự",
  }),
  description: Joi.string().max(255).messages({
    "string.base": "Description must be a string",
    "string.max": "Description must have at most 255 character",
  }),
});
