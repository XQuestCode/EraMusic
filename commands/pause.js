const distube = require("../index");
const { MessageEmbed } = require("discord.js-light");
const config = require("../c");
const db = require("../db");



module.exports = {
  name: "pause",
  aliases: ["rukja", "ruk"],
  execute: async (bot, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;

    if (message.channel.type === "dm") return;
    const footer = await db.get("footer");
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
          .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );
    if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
      distube.pause(message);
      message.react(config.EMOJI_DONE);
    } else {
      let k = config.COLOR;
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `I'm playing songs on another channel. If you want to listen song you could add my 2 more bots by executing \`${prefix}invite\` command.`
          )
          .setTimestamp()
          .setColor(k)
          .setFooter(`Invite me using ${prefix}invite`)
      );
    }
  },
};
