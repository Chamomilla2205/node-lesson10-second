const { O_Auth } = require('../dataBase/models');

module.exports = {
    newToken: (tokens, userId) => O_Auth.create({ ...tokens, _user_id: userId }),

    deleteToken: (_id) => O_Auth.deleteOne({ _id }),

    addNewToken: (tokens, _user_id) => O_Auth.create({ ...tokens, _user_id })

};
