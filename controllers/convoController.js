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
            const {title, messages, player, settings} = req.body;
            //Create a new conversation with a valid userid and title
            const newConvo = await new Convo({
                title: title,
                user: userid,
                messages: messages,
                player: player,
                settings: settings,
            }).save();
            //Return the new conversation
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
    getConvoIDsByUser: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const convos = await Convo.find({user: userid}, '_id',);
            //Extract the ids from the convos
            const convoIds = convos.map(convo => convo._id);
            res.json(convoIds);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getConvo: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const convoId = req.params.id;
            const convo = await Convo.findById(convoId);
            if (!convo) {
                res.status(404).json({success: false, message: 'Conversation not found'});
            }
            if(convo.user != userid) {
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            res.json(convo);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    updateConvo: async (req, res) => {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const convoId = req.params.id;
            const {title, messages, player, settings} = req.body;
            // Get updated convo from request body
            const convo = await Convo.findById(convoId);
            if (!convo) {
                res.status(404).json({success: false, message: 'Conversation not found'});
            }
            if(convo.user != userid) {
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            else{
                const newConvo = {
                    title: title,
                    messages: messages,
                    player: player,
                    settings: settings,
                }
                const options = {new: true};
                //Update the conversation
                const updatedConvo = await Convo.findByIdAndUpdate(convoId, newConvo, options);
                res.json(updatedConvo);
            }
        }
        catch{
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    deleteConvo: async (req, res) => {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decoded.id;
            const convoId = req.params.id;
            const convo = await Convo.findById(convoId);
            if (!convo) {
                res.status(404).json({success: false, message: 'Conversation not found'});
            }
            if(convo.user != userid) {
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            //Delete the conversation
            convo.delete();
            //Update the user's convos array
            const user = await User.findById(userid);
            user.conversations = user.conversations.filter(convo => convo != convoId);
            user.save();
            res.json({success: true, message: 'Conversation deleted'});
        }
        catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
}
