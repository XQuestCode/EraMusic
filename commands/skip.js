const distube = require("../index");
const config = require("../c");
const db = require("../db");
const { MessageEmbed } = require("discord.js-light");
module.exports = {
  name: "skip",
  aliases: ["next" ,"voteskip","agla","aglaa"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;

    let servercheck = await db.get(`djcheck_${message.guild.id}`);
    const footer = await db.get("footer");

    if (servercheck == null) {
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
            .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
            .setFooter(`Invite me using ${prefix}invite`)
            .setColor(config.COLOR)
        );
      if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
        distube.skip(message);
        message.react(config.EMOJI_DONE);
      } else {
        let k = config.COLOR;
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;
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
          .catch(
            message.channel.send(
              `I don't have permission to send embed messages.`
            )
          );
      }
    } else {
      let k = config.COLOR;
      let DJROLe = await db.get(`djrole_${message.guild.id}`);
      if (DJROLe == null) {
        
        return message.channel.send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              `${config.EMOJI_ERROR} DJ only enabled on this server but you've to set a role as DJ role!\n**Handy Dandy Tips:** Try \`${prefix}dj set @Role\` to set this role!`
            )
            .setColor(k)
            .setFooter(config.FOOTER)
            .setTimestamp()
        );
      } else {
        let k = config.COLOR;
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;
        let DJROLe = await db.get(`djrole_${message.guild.id}`);

        if (
          !message.member.roles.cache.has(DJROLe)
        )
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Error!")
              .setDescription(`${config.EMOJI_ERROR} You don't have DJ role`)
              .setColor(k)
              .setFooter(config.FOOTER)
          );

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
        if (message.member.voice.channel == message.guild.me.voice.channel) {
          distube.skip(message);
          message.react(config.EMOJI_DONE);
        } else {
          let prefix = await db.get(`prefix_${message.guild.id}`);
          if (prefix === null) prefix = `${config.PREFIX}`;
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
      }
    }
  },
};
