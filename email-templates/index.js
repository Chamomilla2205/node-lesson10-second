const { emailActionsEnum } = require('../constants');

module.exports = {
    [emailActionsEnum.USER_CREATED]: {
        templateName: 'user-created',
        subject: 'Welcome in team'
    },
    [emailActionsEnum.PASSWORD_CHANGED]: {
        templateName: 'password-changed',
        subject: 'Your password is changed'
    },
    [emailActionsEnum.USER_DELETED]: {
        templateName: 'user-deleted',
        subject: 'Your account is successfully deleted'
    }
};
