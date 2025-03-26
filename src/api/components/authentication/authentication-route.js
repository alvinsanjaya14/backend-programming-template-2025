const express = require('express');
const controller = require('./authentication-controller');

const router = express.Router();

router.post('/login', controller.login);

router.post('/login', controller.login);

module.exports = router; 

module.exports = router;