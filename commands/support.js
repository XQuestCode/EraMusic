const { MessageEmbed } = require("discord.js");
const { SERVER_INVITE , BOT_ID } = require('../config.json');


module.exports = {
  name: "support",
  aliases: ["bug","suggest","suggestion","report"],
  description: "To get support server of bot or report some issue (bug)",
  execute(message, args) {
   
    let support = new MessageEmbed()
      .setTitle(`**Support**`)
      .setDescription(
          
        `Support for <@${BOT_ID}>,
        

        Join our support server [CLICK HERE](${SERVER_INVITE})`
        
      )
      .setURL(
        `${SERVER_INVITE}`
      )
      .setColor("RED");
    return message.channel.send(support);
  }
};


console.log("Support working")