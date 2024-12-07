import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name can not be empty",
    "string.min": "Name must have at least 6 character",
    "string.max": "Name must have at most 255 character",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a email",
    "string.empty": "Email can not be empty",
  }),
  password: Joi.string().required().min(6).max(2555).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password can not be empty",
    "string.min": "Password must have at least 6 character",
    "string.max": "Password must have at most 255 character",
  }),
  phone: Joi.string().min(10).max(10).messages({
    "string.base": "Phone must be a string",
    "string.min": "Phone must have at least 10 character",
    "string.max": "Phone must have at most 10 character",
  }),
  profile_picture: Joi.string().max(255).messages({
    "string.base": "Profile picture must be a string",
    "string.max": "Profile picture must have at most 255 character",
  }),
  role: Joi.string().messages({
    "string.base": "Role must be a string",
  }),
});
