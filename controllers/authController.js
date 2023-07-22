const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = {
    createUser: async (req, res, next) => {
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = new User({
                ...req.body,
                password: hash,
            }).save();
            res.json(newUser);
        }
        catch(err){
            return next(error);
        }
    },
    loginUser: async (req, res, next) => {
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!username || !password){
                return res.status(401).json({success: false, message: 'Please provide username and password'});
            }
            if(!process.env.JWT_SECRET){
                return res.status(500).json({success: false, message: 'Internal server error'});
            }
            if(!user){
                return res.status(401).json({success: false, message: 'User not found'});
            }
            if(user && bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    email: user.email,
                    name:  user.name,
                    date:  user.date,
                }, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.json({success: true, uid:user._id, username: user.username, isAdmin: user.isAdmin, message: 'User logged in', token});
            }
            else{
                return res.status(401).json({success: false, message: 'Incorrect username or password'});
            }
        }
        catch(err){
            return next(error);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            //Destroy the token
            res.json({success: true, message: 'User logged out'});
        } catch (error) {
            return next(error);
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader){
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            const token = authHeader.split(' ')[1];
            if(!process.env.JWT_SECRET){
                res.status(500).json({success: false, message: 'Internal server error'});
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded){
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            const user = await User.findById(decoded.id);
            if(!user){
                res.status(401).json({success: false, message: 'Unauthorized'});
            }
            req.user = user;
            res.json({success: true, message: 'User verified'});
            
        } catch (error) {
            return next(error);
        }
    },
}