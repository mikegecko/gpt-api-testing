const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoSchema = new Schema({
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
    created:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Convo', convoSchema);