const fs = require('fs-extra').promises;

const errorMessage = require('../error/error.messages');
const errorCodes = require('../constants/error.codes');

const { emailActionsEnum } = require('../constants');
const { passHash } = require('../helpers');
const { userService, mailService } = require('../service');
const { utils } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        try {
            const { preferLanguage = 'en' } = req.query;
            const { body: { password, email }, photos, docs } = req;
            const qwert = photos[0];

            const hashPassword = await passHash.hash(password);

            const fullUser = await userService.createUser({ ...req.body, password: hashPassword });

            if (qwert) {
                const { uploadPath, mainPath, pathToStatic } = utils._builder(qwert.name, 'photos', fullUser._id, 'user');

                await fs.mkdir(pathToStatic, { recursive: true });

                await qwert.mv(mainPath);

                await userService.updateUserById(fullUser.id, { avatar: uploadPath });
            }
            if (docs.length) {
                const uploadPathArr = [];
                for (const item of docs) {
                    const { uploadPath, mainPath, pathToStatic } = utils._builder(item.name, 'files', fullUser._id, 'user');

                    await fs.mkdir(pathToStatic, { recursive: true });

                    await item.mv(mainPath);

                    uploadPathArr.push(uploadPath);
                }
                await userService.updateUserById(fullUser.id, { files: uploadPathArr });
            }

            await mailService.sendEmail(email, emailActionsEnum.USER_CREATED, { userName: email });

            res.status(errorCodes.CREATED).json(errorMessage.USER_CREATED[preferLanguage]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = req.query;
            const { tokens } = req;
            console.log(tokens._id);
            console.log(userId);
            if (userId.toString() !== tokens._id.toString()) {
                throw new Error(errorMessage.USER_UNAUTHORIZED);
            }

            await mailService.sendEmail(tokens.email, emailActionsEnum.USER_DELETED, { username: tokens.name });

            await userService.deleteUserById(userId);

            res.json(errorMessage.USER_DELETED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
