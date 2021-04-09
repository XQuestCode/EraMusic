const { MessageEmbed } = require("discord.js-light");
const { FOOTER } = require("../c");
const config = require("../c");
const db = require("../db");

const { NIRMAL_NAME , DYNAMO_NAME , XDOPE_NAME } = require("../c");

module.exports = {
  name: "stats",
  aliases: ["about","info"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
  //  if (!config.OWNER_ID.includes(message.author.id)) return;

    let servers_count = bot.guilds.cache.size;
    var myarray = [];
  bot.guilds.cache.keyArray().forEach(async function(item, index) {
  
      let guildMember = bot.guilds.cache.get(item).memberCount;
      myarray.push(guildMember)
     
    })
    
  let sum = myarray.reduce(function (a, b) {
    return a + b
  });

    let footer = await db.get("footer");
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;

    let embed = new MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setTitle(`My Stats!`)
      .addFields(
        { name: "Servers:", value: `\`\`\`${servers_count}\`\`\``, inline: true },
        { name: "Users:", value: `\`\`\`${sum}\`\`\``, inline: true },
        { name: "Uptime: ", value: uptime },
        { name: "Version: ", value: `09.02.02`, inline: false },
        { name: "Developers !", value: `${NIRMAL_NAME} , ${DYNAMO_NAME} , ${XDOPE_NAME}` , inline: false }
      )
      .setFooter(`Invite me now !`)
      .setColor(config.COLOR);
    message.channel.send(embed);
  },
};


// NIRMAL#8432 , DynamoYT#1000 , xDope#2788