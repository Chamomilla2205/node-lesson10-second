const errorCodes = require('../constants/error.codes');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkValidId: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = res.query;

            if (userId.length !== 24) {
                throw new Error(errorMessages.INVALID_ID[preferLanguage]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    areCarValid: (req, res, next) => {
        try {
            const { price, model } = req.body;
            const { preferLanguage = 'en' } = req.query;

            if (!model || Number.isNaN(price)) {
                throw new Error(errorMessages.REGISTRATION_TROUBLE[preferLanguage]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
