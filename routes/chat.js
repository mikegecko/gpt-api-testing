const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

//Proxy all requests to the OpenAi chat completions API
router.post('/request', authController.verifyToken, chatController.chatRequest);

module.exports = router;

