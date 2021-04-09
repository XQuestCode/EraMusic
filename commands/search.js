const { MessageEmbed } = require("discord.js-light");
const db = require("../db.js");
const distube = require("../index.js");
const Discord = require("discord.js-light");
const config = require("../c");
const dbl = require('../dbl.js');

module.exports = {
  name: "search",
  cooldown: 5,
  aliases: ["s","khoj","dhund","find"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    let k = config.COLOR;
    dbl.hasVoted(message.author.id).then(async v => {
      if(v) {
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
            .setFooter(footer)
        );
      if (!message.guild.me.hasPermission(["CONNECT", "SPEAK"]))
        return message.channel.send(
          new MessageEmbed()
            .setDescription(
              `${config.EMOJI_ERROR} I don't have permission to join your voice channel`
            )
            .setFooter(footer)
            .setColor(config.COLOR)
        );

      if (!message.guild.me.voice.channel)
        await message.member.voice.channel.join();

      if (!distube.isPlaying(message)) {
        await message.member.voice.channel.join();
      }

      db.set(`channel_${message.guild.id}`, message.member.voice.channel.id);

      let filter = (m) => m.author.id === message.author.id;
      message.channel.send(
        new MessageEmbed()
          .setDescription(
            `After this message Type the name of song you want to search!\n\n**Handy Dandy Tips:** Type \`cancel\` if you want to cancel this search!`
          )
          .setFooter(footer)
          .setColor(k)
      );
      message.channel
        .awaitMessages(filter, { max: 1 })
        .then(async (collect) => {
          if (collect.first().content === "cancel")
            return message.channel.send(
              new MessageEmbed()
                .setDescription(`Search Command Cancelled!`)
                .setFooter(footer)
                .setColor(k)
            );

          if (
            message.member.voice.channel.id == message.guild.me.voice.channel.id
          ) {
            let d = config.COLOR;

            let b = await distube.search(collect.first().content);
            let k = b.slice(0, 5);
            //here I'm working
            let First_NAme = k.slice(0, 1).map((f) => f.name);
            // if(First_NAme <= 8) First_NAme = First_NAme.slice(0, 10)
            let First_Duration = k.slice(0, 1).map((f) => f.formattedDuration);
            let First_URL = k.slice(0, 1).map((f) => f.url);

            let Second_NAme = k.slice(1, 2).map((f) => f.name);
            let Second_Duration = k.slice(1, 2).map((f) => f.formattedDuration);
            let Second_URL = k.slice(1, 2).map((f) => f.url);

            let Third_NAme = k.slice(2, 3).map((f) => f.name);
            let Third_Duration = k.slice(2, 3).map((f) => f.formattedDuration);
            let Third_URL = k.slice(2, 3).map((f) => f.url);

            let forth_Name = k.slice(3, 4).map((f) => f.name);
            let forth_Duration = k.slice(3, 4).map((f) => f.formattedDuration);
            let forth_url = k.slice(3, 4).map((f) => f.url);

            let fifth_Name = k.slice(4, 5).map((f) => f.name);
            let fifth_Duration = k.slice(4, 5).map((f) => f.formattedDuration);
            let fifth_url = k.slice(4, 5).map((f) => f.url);

            let embed = new Discord.MessageEmbed()
              .setTitle("SONGS SEARCHED!")
              .setColor(d)
              .setDescription(
                "React a number from 1 to 5, I'll play that song for you!\n\n" +
                  `1. [${First_NAme}](${First_URL}) | Duration: \`${First_Duration}\`\n` +
                  `2. [${Second_NAme}](${Second_URL}) | Duration: \`${Second_Duration}\`\n` +
                  `3. [${Third_NAme}](${Third_URL}) | Duration: \`${Third_Duration}\`\n` +
                  `4. [${forth_Name}](${forth_url}) | Duration: \`${forth_Duration}\`\n` +
                  `5. [${fifth_Name}](${fifth_url}) | Duration: \`${fifth_Duration}\``
              )
              .setFooter(footer);
            message.channel.send(embed).then((res) => {
              res.react("<:1_:778878496042778655>");
              res.react("<:2_:778878496226672680>");
              res.react("<:3_:778878495887589386>");
              res.react("<:4_:778878495513903114>");
              res.react("<:5_:778878495060394014>");

              let filter = (reaction) =>
                reaction.emoji.id == "778878496042778655";
              let filter1 = (reaction1) =>
                reaction1.emoji.id == "778878496226672680";
              let filter2 = (reaction2) =>
                reaction2.emoji.id == "778878495887589386";
              let filter3 = (reaction3) =>
                reaction3.emoji.id == "778878495513903114";
              let filter4 = (reaction4) =>
                reaction4.emoji.id == "778878495060394014";

              let collector = res.createReactionCollector(filter);
              let collector1 = res.createReactionCollector(filter1);
              let collector2 = res.createReactionCollector(filter2);
              let collector3 = res.createReactionCollector(filter3);
              let collector4 = res.createReactionCollector(filter4);

              collector.on("collect", (reaction, user) => {
                if (user.bot) return;
                if (message.author.id != user.id) {
                  user.send(
                    `Sorry, You can't add reaction on that message. Only <@${message.author.id}> can add!`
                  );
                  return reaction.users.remove(user.id);
                }
                res.delete();
                distube.play(message, `${First_URL}`);
              });

              collector1.on("collect", (reaction, user) => {
                if (user.bot) return;
                if (message.author.id != user.id) {
                  user.send(
                    `Sorry, You can't add reaction on that message. Only <@${message.author.id}> can add!`
                  );
                  return reaction.users.remove(user.id);
                }
                res.delete();
                distube.play(message, `${Second_URL}`);
              });
              collector2.on("collect", (reaction, user) => {
                if (user.bot) return;
                if (message.author.id != user.id) {
                  user.send(
                    `Sorry, You can't add reaction on that message. Only <@${message.author.id}> can add!`
                  );
                  return reaction.users.remove(user.id);
                }
                res.delete();
                distube.play(message, `${Third_URL}`);
              });
              collector3.on("collect", (reaction, user) => {
                if (user.bot) return;
                if (message.author.id != user.id) {
                  user.send(
                    `Sorry, You can't add reaction on that message. Only <@${message.author.id}> can add!`
                  );
                  return reaction.users.remove(user.id);
                }
                res.delete();
                distube.play(message, `${forth_url}`);
              });
              collector4.on("collect", (reaction, user) => {
                if (user.bot) return;
                if (message.author.id != user.id) {
                  user.send(
                    `Sorry, You can't add reaction on that message. Only <@${message.author.id}> can add!`
                  );
                  return reaction.users.remove(user.id);
                }
                res.delete();
                distube.play(message, `${fifth_url}`);
              });
            });
          } else {
           
            let f = config.FOOTER;

            return message.channel.send(
              new MessageEmbed()
                .setTitle("Error!")
                .setDescription(
                  `I'm playing songs on another channel. If you want to listen song you could add my 2 more bots by executing \`${prefix}invite\` command.`
                )
                .setTimestamp()
                .setColor(k)
                .setFooter(footer)
            );
          }
        });

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
