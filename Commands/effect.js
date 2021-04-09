const distube = require("../index.js");
const { MessageEmbed } = require("discord.js-light");
const db = require("../db");
const config = require("../c");
const dbl = require('../dbl.js');


module.exports = {
  name: "effect",
  aliases: ["e", "f", "filters", "filter", "effects"],
  execute: async (bot, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;


    if (message.channel.type === "dm") return;

    let k = config.COLOR;
    const footer = await db.get("footer");

    dbl.hasVoted(message.author.id).then(async v => {
      if(v == true) {
      if (!message.member.voice.channel)
        return message.channel.send(
          new MessageEmbed()
             .setTitle("Error!")
          .setDescription(
            `${config.EMOJI_ERROR} You haven't joined the voice channel.`
          )
          .setTimestamp()
          .setColor(config.COLOR)
          .setFooter(`Thanks for using PreoMusic`)
        );
      if (!message.guild.me.hasPermission(["CONNECT", "SPEAK"]))
        return message.channel.send(
          new MessageEmbed()
            .setDescription(
              `${config.EMOJI_ERROR} I don't have permission to join your voice channel`
            )
            .setFooter(`Thanks for using PreoMusic`)
            .setColor(config.COLOR)
        );
      if (!message.guild.me.voice.channel)
        await message.member.voice.channel.join();

      db.set(`channel_${message.guild.id}`, message.member.voice.channel.id);

      
      if (!distube.isPlaying(message))
        return message.channel.send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
            .setFooter(`Thanks for using PreoMusic`)
            .setColor(config.COLOR)
        );
      if (
        message.member.voice.channel.id == message.guild.me.voice.channel.id
      ) {
        let k = config.COLOR;

        if (args[0] && args[0].toLowerCase() === "3d") {
          let filter = distube.setFilter(message, "3d");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "bassboost") {
          let filter = distube.setFilter(message, "bassboost");

          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "echo") {
          let filter = distube.setFilter(message, "echo");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "karaoke") {
          let filter = distube.setFilter(message, "karaoke");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "nightcore") {
          let filter = distube.setFilter(message, "nightcore");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "vaporwave") {
          let filter = distube.setFilter(message, "vaporwave");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "flanger") {
          let filter = distube.setFilter(message, "flanger");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "gate") {
          let filter = distube.setFilter(message, "gate");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "haas") {
          let filter = distube.setFilter(message, "haas");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "reverse") {
          let filter = distube.setFilter(message, "reverse");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "surround") {
          let filter = distube.setFilter(message, "surround");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "mcompand") {
          let filter = distube.setFilter(message, "mcompand");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "phaser") {
          let filter = distube.setFilter(message, "phaser");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "tremolo") {
          let filter = distube.setFilter(message, "tremolo");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else if (args[0] && args[0].toLowerCase() === "earwax") {
          let filter = distube.setFilter(message, "earwax");
          return message.channel.send(
            new MessageEmbed()
              .setColor(k)
              .setDescription(
                `${config.EMOJI_DONE} Music Effects set to: ` +
                  (filter || "Nothing")
              )
              .setFooter(
                `Handy Dandy Tip: Again execute this command to turn off this effect!`
              )
          );
        } else {
          let k = config.COLOR;
          message.channel.send(
            new MessageEmbed()
              .setTitle("Music Effects!")
              .addFields(
                {
                  name: `\`${prefix}effect 3d\``,
                  value: "This will set music effect to 3d!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect bassboost\``,
                  value: "This will set music effect to bassboost!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect echo\``,
                  value: "This will set music effect to echo!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect karaoke\``,
                  value: "This will set music effect to karaoke!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect nightcore\``,
                  value: "This will set music effect to nightcore!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect vaporwave\``,
                  value: "This will set music effect to vaporwave!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect flanger\``,
                  value: "This will set music effect to flanger!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect gate\``,
                  value: "This will set music effect to gate!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect haas\``,
                  value: "This will set music effect to haas!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect reverse\``,
                  value: "This will set music effect to reverse!",
                  inline: true,
                },
                {
                  name: `\`${prefix}effect surround\``,
                  value: `This will set music effect to surround!`,
                  inline: true,
                },
                {
                  name: `\`${prefix}effect mcompand\``,
                  value: `This will set music effect to mcompand!`,
                  inline: true,
                },
                {
                  name: `\`${prefix}effect phaser\``,
                  value: `This will set music effect to phaser!`,
                  inline: true,
                },
                {
                  name: `\`${prefix}effect tremolo\``,
                  value: `This will set music effect to tremolo!`,
                  inline: true,
                },
                {
                  name: `\`${prefix}effect earwax\``,
                  value: `This will set music effect to earwax!`,
                  inline: true,
                }
              )
              .setFooter(`Thanks for using PreoMusic`)
              .setColor(k)
          );
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
              .setFooter(`Thanks for using PreoMusic`)
          )
          .catch(
            message.channel.send(
              `I don't have permission to send embed messages.`
            )
          )
          .then((response) => {
            response.react("🗑️");

            let filter = (reaction) => reaction.emoji.name === "🗑️";

            let collector = response.createReactionCollector(filter, {
              time: 10 * 60 * 1000,
            });

            collector.on("collect", (reaction, user) => {
              if (user.bot) return;
              if (message.author.id != user.id)
                return reaction.users.remove(user.id);
              response.delete();
            });
          });
      }
    
  } else {
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          `This command is locked!\n\nYou've to vote PreoMusic on top.gg if you want to unlock this command.\nLink: [Here](https://top.gg/bot/774642458889814066/vote)`
        )
        .setColor(config.COLOR)
    );
  }
})
  },
};



