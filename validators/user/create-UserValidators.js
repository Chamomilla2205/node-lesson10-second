const Joi = require('joi');
const { constants, regexp } = require('../../constants');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    bornYear: Joi
        .number()
        .min(constants.CURRENT_YEAR - 100)
        .max(constants.CURRENT_YEAR - 14)
        .required(),
    email: Joi
        .string()
        .regex(regexp.EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(regexp.PASS_REGEXP)
        .min(8)
        .required(),
    cars: Joi
        .array()
});
