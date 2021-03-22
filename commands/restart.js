

const { MessageEmbed } = require("discord.js");
const { EMOJI_DONE , BOT_ID } = require('../config.json');


module.exports = {
    name: "restart",
    aliases: ["blast"],

    execute: async (client, message, args) => {
        if (message.author.id !== '679561036646449178') {
            return message.channel.send(`Only <@512520979788857355> Can Use This Command.`)
        }
        await message.channel.send(`Restarting bot :)`)
        process.exit();
    }
}
