const Joi = require('joi');
const { constants: { CURRENT_YEAR } } = require('../../constants');

module.exports = Joi.object({
    type: Joi
        .string()
        .required(),
    model: Joi
        .string()
        .required(),
    price: Joi
        .number()
        .required(),
    prodYear: Joi
        .number()
        .max(CURRENT_YEAR)
        .required(),
    color: Joi
        .string()
        .alphanum()
        .required(),
    crushed: Joi
        .boolean()
        .required(),
    photos: Joi
        .array(),
    files: Joi
        .array()
});
