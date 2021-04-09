const db = require("../db.js");
const config = require("../c");
const distube = require("../index");
const { MessageEmbed } = require("discord.js-light");

module.exports = {
  name: "disconnect",
  aliases: ["dc" ,"nikal" , "leave","chalaja"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    const footer = await db.get("footer");
    const lang = await db.get(`lang_${message.guild.id}`)

// let set only manage guild can disconnect the bot to vc , oke

let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    if (!message.member.hasPermission(["MANAGE_GUILD"]))
    return message.channel.send(
      new MessageEmbed()
        .setTitle("Error!")
        .setDescription(
          "In order to use this command you need to have `Manage Server` Permission!"
        )
        .setColor("RED")
        .setFooter(`Invite me using ${prefix}invite`)
    );



    if (!message.member.voice.channel) {
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
    }
    if (message.guild.me.voice.channel == null) return;
    if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
      if (distube.isPlaying(message)) {
        distube.stop(message);
        message.member.voice.channel.leave();
        message.react(config.EMOJI_DONE);
        return db.delete(`channel_${message.guild.id}`);
      } else if (!distube.isPlaying(message)) {
        message.member.voice.channel.leave();
        message.react(config.EMOJI_DONE);

        return db.delete(`channel_${message.guild.id}`);
      }
    } else {
      let k = config.COLOR;
      return message.channel
        .send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              `I'm playing songs on another channel. If you want to listen song you could add my 2 more bots by executing \`${prefix}invite\` command.`
            )
            .setTimestamp()
            .setColor(k)
            .setFooter(`Invite me using ${prefix}invite`)
        )
       
        
    }
  },
};
