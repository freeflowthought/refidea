var Joi = require('joi');
module.exports = {
  email    : Joi.string().email().required().max(254), // Required
  password : Joi.string().required().min(6).max(100),  // minimum length 6 characters]
  id       : Joi.any().forbidden()
};
