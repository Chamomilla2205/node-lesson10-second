const jwt = require('jsonwebtoken');
const { errorCodes, constants } = require('../constants');
const { Users, O_Auth } = require('../dataBase/models');
const { passHash } = require('../helpers');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const errorMessages = require('../error/error.messages');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });

            if (!user) {
                throw new Error(errorMessages.LOGIN_ERROR);
            }

            await passHash.compare(password, user.password);

            req.profile = user;

            next();
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(errorMessages.USER_UNAUTHORIZED);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED);
            }
            req.tokens = tokens._user_id;

            next();
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessages.TOKEN_IS_REQUIRED);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            req.tokens = tokens;

            next();
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
