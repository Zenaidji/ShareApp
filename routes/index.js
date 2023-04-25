const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');
const indexController = require('../controllers/index.controller');

router.get('/*', authMiddleware.validToken, indexController.home );





 

module.exports = router;
