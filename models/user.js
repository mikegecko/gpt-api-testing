const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Figure out how to store premium tokens/normal tokens for users also add in subtracting on message request and dont allow if user has none
    tokens:{
        type: Array,
        default: [],
    },
    //Convo is an array of _ids that point to the conversations that the user has made
    conversations:{
        type: Array,
        default: [],
    },
    date:{
        type: Date,
        default: Date.now
    },
    }, {collection: 'users'});

    module.exports = mongoose.model('User', userSchema);