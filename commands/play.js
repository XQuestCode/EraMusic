const { MessageEmbed, Message } = require("discord.js-light");
const db = require("../db");
const distube = require("../index.js");
const config = require("../c");

module.exports = {
  name: "play",
  cooldown: 5,
  aliases: ["p","song","bja","baja","ganna","song","gaana"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;

    let k = config.COLOR;

    const footer = await db.get("footer");

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;


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

    if (!message.channel.permissionsFor(bot.user.id).has(["CONNECT", "SPEAK"]))
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            `${config.EMOJI_ERROR} I don't have permission to join your voice channel`
          )
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );

    if (!message.guild.me.voice.channel) {
      await message.member.voice.channel.join();
    }
    db.set(`channel_${message.guild.id}`, message.member.voice.channel.id);

    if (!distube.isPlaying(message)) {
      await message.member.voice.channel.join();
    }

   
    if (args.length == 0) {
      return message.channel.send(
        new MessageEmbed()
          .setDescription(`Try: \`${prefix}play <SongName | SongURL>\``)
          .setColor(k)
      );
    }

    if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
      if (distube.isPaused(message)) {
        message.react(config.EMOJI_DONE);
        return distube.resume(message);
      } else {
        distube.play(message, args.join(" "));
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
