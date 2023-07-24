const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

//Proxy all requests to the OpenAi chat completions API
router.post('/chat', chatController.chatRequest);

module.exports = router;

