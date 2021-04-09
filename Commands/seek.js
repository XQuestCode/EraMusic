const Discord = require("discord.js-light");
const distube = require("../index.js");
const config = require("../c");
const { MessageEmbed } = require("discord.js-light");
const db = require("../db.js");
const { toSecond } = require("distube/src/duration.js");

module.exports = {
  name: "seek",
  cooldown: 3,
  aliases: ["forward","aage"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;

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

    if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
      let time = args[0];
      if (!time) {
        return message.channel.send(
          new MessageEmbed()
            .setFooter(`Invite me using ${prefix}invite`)
            .setDescription(
              `${config.EMOJI_ERROR} You haven't mentioned a time. Mention time like \`02:17\``
            )
            .setColor(config.COLOR)
        );
      }
      let queue = distube.getQueue(message);
      let songs_time = queue.songs
        .map((m) => m.formattedDuration)
        .slice(0, 1)
        .toString();
      console.log(songs_time);
      let songs_in = toSecond(songs_time) * 1000;
      let seconds = toSecond(time) * 1000;

      if (songs_in >= seconds) {
        console.log(seconds);
        console.log(songs_in);
        distube.seek(message, seconds);
        message.channel.send(
          `${config.EMOJI_DONE} Done the song seeked to **${time}**!`
        );
      } else {
        return message.channel.send(
          new MessageEmbed().setDescription(
            `${config.EMOJI_ERROR} You can't seek song greater than \`${songs_time}\``
          )
        );
      }
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
