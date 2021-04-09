const { MessageEmbed } = require("discord.js-light");
const config = require("../c");

module.exports = {
  name: "bug",
  aliases: ["bugs"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") {
      const filter = (m) => m.author.id === message.author.id;
      let suggestions = args.join(" ");
      const channel = bot.channels.cache.get(config.BUG_CHANNEL_ID);
      if (!suggestions) {
        // message.channel.send(`Type your bug **NOW**`);
        message.channel.send(`Please describe your bug.`);
        message.channel.awaitMessages(filter, { max: 1 }).then((collect) => {
          let k = "#ff69b4";

          if (collect.first().content === "cancel")
            return message.channel.send(
              new MessageEmbed()
                // .setDescription(`Bug Command Cancelled!`)
                .setDescription(`Bug command canceled.`)
                .setFooter(config.FOOTER)
                .setColor(k)
            );

          channel
            .send(
              new MessageEmbed()
                .setAuthor(
                  // "New Bug!",
                  'A bug has been reported.',
                  "https://cdn.discordapp.com/emojis/749495696821977109.gif?v=1"
                )
                .setDescription(
                  // `This bug given by ${message.author.tag} (${
                  `This bug was reported by ${message.author.tag} (${
                    message.author.id
                  // })!\n\nBug is **${
                  }).\n\n\nBug description:\n\n${
                    collect.first().content
                  // }**\n\nThanks you soo much!`
                  }**\n\nThank you.`
                )
                .setColor("#f59042")
                .setFooter(config.FOOTER)
            )
            .then(
              message.channel.send(
                // `Thanks for submitting a bug. Your bug has been send in channel <#${config.BUG_CHANNEL_ID}>`
                `Thanks for your report. Please refer to <#${config.BUG_CHANNEL_ID}> to view it. Server Link: https://discord.gg/Bwa6u3D8ep | For your answer`
              )
            );
        });
      } else {
        let suggestions = args.join(" ");
        channel
          .send(
            new MessageEmbed()
              .setAuthor(
                // "New Bug!",
                'A bug has been reported.',
                "https://cdn.discordapp.com/emojis/749495696821977109.gif?v=1"
              )
              .setDescription(
                // `This bug given by ${message.author.tag} (${message.author.id})!\n\nBug is **${suggestions}**\n\nThanks you soo much!`
                `This bug was reported by ${message.author.tag} (${message.author.id}).\n\n\nBug description:\n\n${suggestions}\n\nThank you.`
              )
              .setColor("#f59042")
              .setFooter(config.FOOTER)
          )
          .then(
            message.channel.send(
              // `Thanks for submitting a bug. Your bug has been send in channel <#${config.BUG_CHANNEL_ID}>`
              `Thanks for your report. Please refer to <#${config.BUG_CHANNEL_ID}> to view it. Server Link: https://discord.gg/Bwa6u3D8ep | For your answer`
            )
          );
      }
    } else {
      message.channel.send(
        // `Only you can use this command in my Direct Messages!`
        `This command must be used in DMs.`
      );
    }
  },
};
