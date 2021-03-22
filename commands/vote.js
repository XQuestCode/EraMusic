
const { MessageEmbed } = require("discord.js");
const { COLOR } = require('../config.json');
const { EMOJI_DONE , BOT_ID  } = require('../config.json');

module.exports = {
  name: "vote",
  aliases: ["voted"],
  description: "To get vote link of our bot , please vote us!",
  execute(message, args) {
   
    let vote = new MessageEmbed()
      .setTitle(`**Vote**`)
      .setDescription(
        

        `Vote me please!\n\nLink: [Click Here](https://top.gg/bot/${BOT_ID}/vote) Thanks on advance`
        
      )
      .setURL(
        `https://top.gg/bot/${BOT_ID}/vote`
      )

      
      .setColor(COLOR);
    return message.channel.send(vote) , message.react(EMOJI_DONE);
       
  }

};
console.log("vote working")