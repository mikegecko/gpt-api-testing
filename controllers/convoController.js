const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Convo = require('../models/convo')

module.exports = {
    createConvo: async (req, res) => {
        try {
             //Extract userid from token -> it is already validated by verifyToken
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const title = req.body.title;
            //Create a new conversation with a valid userid and title
            const newConvo = new Convo({
                title: title,
                user: userid,
            }).save();
            res.json(newConvo);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getCovosByUser: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const convos = await Convo.find({user: userid});
            res.json(convos);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    updateConvo: async (req, res) => {

    },
    deleteConvo: async (req, res) => {
        
    },
}
