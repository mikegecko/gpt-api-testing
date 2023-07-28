const Player = require('../models/player');

module.exports = {
    functionDefinitions: [
        {
            name: 'get_player_data',
            description: "Get the player's data",
            parameters: {
                type: "object",
                properties: {
                    
                }
            }
        },
    ],
    get_player_data: async (args) => {
        //const playerData = new Player();
        //const playerData = Player.findOne({name: "test"});
        const playerData = {name: "test", level: 1}
        return(JSON.stringify(playerData));
    },
    set_player_data: async (args) => {
        // Access arguments using args.property and args.value

    },


};

