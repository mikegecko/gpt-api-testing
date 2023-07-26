const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//POST signup
router.post('/signup', authController.createUser);

//POST login
router.post('/login', authController.loginUser);

//POST logout
router.post('/logout', authController.logoutUser);

//GET verify
router.get('/verify', authController.verifyToken, (req, res) => {
    const decodedToken = req.decoded;
    res.json({success: true, message: 'User Verified'});
});



module.exports = router;