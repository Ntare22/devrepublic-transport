import Joi from 'joi';

const validateTrip = (req, res, next) => {
  const schema = {
    destination: Joi.string().max(7).required().trim()
      .valid('Remera', 'Kimironko'),
    location: Joi.string().trim().max(7).required()
      .valid('stadium', 'gisimenti'),
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

export default validateTrip;
