const { MessageEmbed } = require("discord.js-light");
const { FOOTER } = require("../c");
const config = require("../c");
const db = require("../db");
 
const { NIRMAL_NAME , DYNAMO_NAME , XDOPE_NAME} = require("../c");

module.exports = {
    name: "support",
    aliases: ["report" , "server","servers" ,"supportserver","support server"],
  execute: async (bot, message, args) => {
      
      let prefix = await db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = `${config.PREFIX}`;

    let embed = new MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setTitle(`My prefix in **${message.guild.name}** is \`${prefix}\``)
      .setDescription(`***INFO*** `)    
      .addFields(        
        { name: "Join Our support server !", value: `[Support Server](https://discord.gg/Bwa6u3D8ep)`, inline: true },
  
        { name: "Vote", value: `[Vote Me Now](https://top.gg/bot/774642458889814066/vote)`, inline: true },

        { name: "Developers !", value: `${NIRMAL_NAME} , ${DYNAMO_NAME} , ${XDOPE_NAME}` , inline: false }

        )
      .setFooter(`Invite me using ${prefix}invite`)
      .setColor(config.COLOR);
    message.channel.send(embed);
  },
};

// NIRMAL