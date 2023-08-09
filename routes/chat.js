const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');
const convoController = require('../controllers/convoController');

//Proxy all requests to the OpenAi chat completions API
router.post('/request', authController.verifyToken, chatController.chatRequest);
//Create a conversation
router.post('/conversation', authController.verifyToken, convoController.createConvo);
//Get a conversation by id
router.get('/conversation/:id', authController.verifyToken, convoController.getConvo);
//Get all user conversations
router.get('/conversation', authController.verifyToken, convoController.getCovosByUser);
//Update a conversation by id
router.put('conversation/:id', authController.verifyToken, convoController.updateConvo);
//Delete a conversation by id
router.delete('/conversation/:id', authController.verifyToken, convoController.deleteConvo);

module.exports = router;

