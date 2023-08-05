const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    role:{
        type:String,
    },
    content:{

    },
})

module.exports = mongoose.model('Message',messageSchema);