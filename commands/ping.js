const distube = require('../index');
const db = require("../db");
const config = require("../c");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    execute: async(bot, message, args) => {
      
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;
    
        if(message.channel.type == 'dm') return;

        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Ping - Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
        });
        console.log(distube.guildQueues.size)
    }
}