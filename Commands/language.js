const config = require('../c.js');
const db = require('../db');
const Discord = require('discord.js-light');
module.exports = {
    name: "language",
    aliases: ["lang"],
    execute: async(bot, message, args) => {
        if(message.channel.type == 'dm') return

        let ownerID = ["512520979788857355"];
        if(!ownerID.includes(message.author.id)) return;


        if(!message.member.hasPermission(['MANAGE_GUILD'])) {
            let languge = await db.get(`languge_${message.guild.id}`);
            if(languge == null) {
                languge = 'en'
            } else {
                languge = 'hi'
            }
            let bot_lan = require(`../Language/${languge}.js`);
            let embed = new Discord.MessageEmbed()
            .setDescription(`${config.EMOJI_ERROR} ${bot_lan.NO_HAVE_MANAGE_SERVER_PERMISSION}`)
            .setColor(config.COLOR);
            return message.channel.send(embed);
        }

        let languages = args[0];
        if (languages == 'english' || languages == 'en') {
            
           db.delete(`languge_${message.guild.id}`);
           return message.react(config.EMOJI_DONE);

        } else if(languages == 'hindi' || languages == 'hi') {
            db.set(`languge_${message.guild.id}`, true);
            return message.react(config.EMOJI_DONE);
        }

    }

}