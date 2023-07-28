const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name:{
        type: String,
    },
    health:{
        type: Number,
    },
    xp:{
        type: Number,
    },
    level:{
        type: Number,
    },
    mana:{
        type: Number,
    },
    stamina:{
        type: Number,
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    }, {collection: 'players'});

    module.exports = mongoose.model('Player', playerSchema);