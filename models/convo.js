const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoSchema = new Schema({
    title:{
        type: String,
        required: true,  
    },
    messages: [],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    player:{
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: false
    },
    settings:{
        type: Object,
        default: {
            temperature: 0.7,
            //Add more settings here once I decide on them
        }
    },
    created:{
        type: Date,
        default: Date.now
    }
}, {collection: 'convos'});

module.exports = mongoose.model('Convo', convoSchema);