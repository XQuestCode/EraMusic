const {MessageEmbed} = require("discord.js-light");
const distube = require("../index.js");
const config = require("../c");
const db = require("../db.js");
module.exports = {
  name: "volume",
  aliases: ["v", "vol" , "avaaj" , "avaj"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix == null) prefix = config.PREFIX;
    const footer = await db.get("footer");
    let k = config.COLOR;

    if (!message.member.voice.channel)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `${config.EMOJI_ERROR} You haven't joined the voice channel.`
          )
          .setTimestamp()
          .setColor(config.COLOR)
          .setFooter(`Invite me using ${prefix}invite`)
      );

    if (!distube.isPlaying(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} My queue list is empty! type ${prefix} to play an song!`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );
    if (message.member.voice.channel == message.guild.me.voice.channel) {
      let a = Number(args[0]);
     
      if(!a) {
        return message.channel.send(`The current volume is: \`${distube.getQueue(message).volume}\`%.`)
      }

      if (a >= 151) {
        return message.channel.send(
          `${config.EMOJI_ERROR} You can't set volume to **${a}%**, **150%** is the highest.`
        );
      }
      await distube.setVolume(message, a);

      return message.channel.send(`Volume set to: \`${a}\`%`);
    } else {
      let k = config.COLOR;
      
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `${config.EMOJI_ERROR} I'm playing songs on another channel. If you want to listen song you could add my 2 more bots by executing \`${prefix}invite\` command.`
          )
          .setTimestamp()
          .setColor(k)
          .setFooter(`Invite me using ${prefix}invite`)
      );
    }
  },
};
