const Joi = require('joi');
const { HTTP_BAD_REEQUEST_STATUS } = require('../utils/status-HTTP');

const PRODUCTS = Joi.object({
  displayName: Joi.string().min(8).max(30).required()
    .messages({
      required: '"displayName" is required',
      pattern: '"displayName" length must be at least 8 characters long',
    }),
  password: Joi.string().min(6).required()
    .messages({
      required: '"password" is required',
      pattern: '"password" length must be at least 6 characters long',
    }),
  email: Joi.string().required()
    .messages({
      required: '"email" is required',
    }),
  image: Joi.string().required()
    .messages({
      required: '"image" is required',
    }),
});

const validateProduct = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = PRODUCTS.validate({
    displayName,
    password,
    email,
    image,
  });
  const validateEmail = email.includes('@' && '.com');

  if (error) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({ message: error.message });
  }

  if (!validateEmail) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = validateProduct;