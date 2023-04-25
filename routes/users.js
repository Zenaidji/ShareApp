const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

const userController = require('../controllers/user.controller.js');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );
router.put('/emprunt', userController.update );

module.exports = router;