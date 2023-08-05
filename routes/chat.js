const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');
const convoController = require('../controllers/convoController');

//Proxy all requests to the OpenAi chat completions API
router.post('/request', authController.verifyToken, chatController.chatRequest);

router.post('/conversation', authController.verifyToken, convoController.createConvo);

router.get('/conversation/:id', authController.verifyToken, convoController.getConvo);

module.exports = router;

