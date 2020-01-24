import Joi from 'joi';

const validateUser = (req, res, next) => {
  const schema = {
    firstName: Joi.string().regex(/^[a-zA-Z\s\S]+$/).max(30).required(),
    lastName: Joi.string().regex(/^[a-zA-Z\s\S]+$/).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(8).max(15)
      .required(),
    status: Joi.string().regex(/^[a-zA-Z\s\S]+$/).max(30).required(),
    busNo: Joi.string().regex(/^[a-zA-Z\s\S]+$/).max(6),
  };

  const validate = Joi.validate(req.body, schema);

  if (validate.error !== null) {
    return res.status(400).json({
      status: 400,
      error: `${validate.error.details[0].message}`,
    });
  }
  return next();
};

export default validateUser;
