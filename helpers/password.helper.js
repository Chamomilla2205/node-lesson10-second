const bcrypt = require('bcrypt');
const errorMessage = require('../error/error.messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 5),
    compare: async (password, hashPassword) => {
        const isPassEqual = await bcrypt.compare(password, hashPassword);

        if (!isPassEqual) {
            throw new Error(errorMessage.LOGIN_ERROR);
        }
    }

};
