const Joi = require("joi");

module.exports.user = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  job: Joi.string().required().min(3),
  description: Joi.string().required(),
  logo: Joi.string(),
}).required();
