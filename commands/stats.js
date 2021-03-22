
    const { MessageEmbed } = require("discord.js");
    const { EMOJI_DONE ,BOT_OWNER_ID ,SERVER_INVITE  } = require('../config.json');


    
module.exports = {
  name: "stats",
  description: "Show detail stats of bot",
  aliases: ["about"],
  execute(message, args) {

let servers_count = message.client.guilds.cache.size;
var myarray = [];
message.client.guilds.cache.keyArray().forEach(async function(item, index) {

  let guildMember = message.client.guilds.cache.get(item).memberCount;
  myarray.push(guildMember)
})
let sum = myarray.reduce(function (a, b) {
return a + b
});

    let totalSeconds = message.client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    
    let uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;
    
    let embed = new MessageEmbed()
    
    .setTitle(`**[Support Server]**`)
      .setDescription(`Hey My name is **${message.client.user.username}** *and My Work is to play Music*`)

      .setTitle(`${message.client.user.username} Stats`)
      .addFields(
        { name: "Servers:", value: `\`\`\`${servers_count}\`\`\``, inline: true },
        { name: "Users:", value: `\`\`\`${sum}\`\`\``, inline: true },
        { name: "Uptime: ", value: uptime },


        { name: "BOT OWNER",value: `<@${BOT_OWNER_ID}> , <@512520979788857355>`}

      )

      .setAuthor(message.client.user.username, message.client.user.displayAvatarURL() )

      .setURL(
        `${SERVER_INVITE}`
      )

      .setColor("BLUE");   

      message.react(EMOJI_DONE);
    return message.channel.send(embed);
    }
};

console.log("stats working")
