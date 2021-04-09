const db = require('../db.js');
const Discord = require('discord.js-light');
const config = require('../c.js');
module.exports = {
    name: "premium",
    aliases: ["preoadd"],
    execute: async(bot, message, args) => {

      

        let ownerID = ["512520979788857355", "701731392228163587"];
        if(!ownerID.includes(message.author.id)) return;

        let user = args[0];

        db.push(`premium`, user);
        return message.react(config.EMOJI_DONE);

    }
}