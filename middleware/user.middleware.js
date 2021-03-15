const errorCodes = require('../constants/error.codes');
const errorMessages = require('../error/error.messages');
const { userValidators } = require('../validators');
const { Users } = require('../dataBase/models');

module.exports = {
    checkValidId: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = req.params;

            if (userId.length !== 24) {
                throw new Error(errorMessages.INVALID_ID[preferLanguage]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    areUserDataOk: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await Users.findOne({ email });

            const { error } = userValidators.createUserValidators.validate(req.body);

            if (user) {
                throw new Error(errorMessages.USER_EXIST);
            }

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
