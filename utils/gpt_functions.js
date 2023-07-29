const Player = require('../models/player');
//Empty functions still require the parameters field to be populated

const playerData = {name: "test", health: 100, mana: 100, stamina: 100, xp: 0}

module.exports = {
    functionDefinitions: [
        {
            name: 'test_function',
            description: "A test function",
            parameters: {
                type: "object",
                properties: {},
            },
        },
        {
            name: 'get_player_data',
            description: "Get the player's data",
            parameters: {
                type: "object",
                properties: {
                    
                },
            }
        },
        {
            name: 'set_player_data',
            description: "Set the player's data",
            parameters: {
                type: "object",
                properties: {
                    property:{
                        type: "string",
                        enum: ["health", "mana", "stamina", "xp", "name"],
                        description: "The property to set, e.g. health, mana, stamina"
                    },
                    value:{
                        type: "number",
                        description: "The value to set the property to"
                    },
                },
                required: ["property", "value"],
            }
        },
    ],
    get_player_data: async (args) => {
        //const playerData = new Player();
        //const playerData = Player.findOne({name: "test"});
        return(JSON.stringify(playerData));
    },
    set_player_data: async (args) => {
        // Access arguments using args.property and args.value
        playerData[args.property] = args.value;
        return(JSON.stringify(playerData));
    },
    test_function: async (args) => {
        return("test success");
    },


};

