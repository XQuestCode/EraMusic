const distube = require('../index.js');
const config = require('../c.js');
const { MessageEmbed } = require('discord.js-light');
const db = require('../db.js')
module.exports = {
    name: "premiumjoin",
    aliases: ["prejoin", "1090join"],
    execute: async(bot, message, args) => {
  // Nirmal , Dynomo , xDope
  let ownerID = ["512520979788857355", "679561036646449178"];
  if(!ownerID.includes(message.author.id)) return;

        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;
        if(!distube.isPlaying(message)) {
            await message.member.voice.channel.join()    
             db.set(`channel0_${message.guild.id}`, message.member.voice.channel.id)       
            return message.react(config.EMOJI_DONE)
        } else {
            let k = config.COLOR;
            message.react(config.EMOJI_ERROR)
            return message.channel.send(new MessageEmbed().setFooter(config.FOOTER).setTitle("Error!").setDescription(`<@${message.author.id}> Error Join Our Support Server For More Info - https://discord.gg/Bwa6u3D8ep`).setTimestamp().setColor(k))
        }
    }
}