const router = require('express').Router();
const authController = require('../controller/auth.controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isUserValid, authController.enterToAccount);

router.post('/refreshToken', authMiddleware.checkRefreshTokenMiddleware, authController.getNewTokens);

module.exports = router;
