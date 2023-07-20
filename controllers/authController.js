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

        }
        catch(err){
            return next(error);
        }
    },
    logoutUser: async (req, res, next) => {
        try{

        }
        catch(err){
            return next(error);
        }
    },
}