const { MessageEmbed } = require("discord.js-light");
const config = require("../c.js");
const db = require("../db.js");

module.exports = {
  name: "suggest",
  aliases: ["suggestion"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") {
      const filter = (m) => m.author.id === message.author.id;
      let suggestions = args.join(" ");
      const channel = bot.channels.cache.get(config.SUGGESTION_CHANNEL_ID);

      if (!suggestions) {
        message.channel.send(`Type your suggestions **NOW**`);
        message.channel.awaitMessages(filter, { max: 1 }).then((collect) => {
          let k = "#ff69b4";

          if (collect.first().content === "cancel")
            return message.channel.send(
              new MessageEmbed()
                .setDescription(`Suggetion Command Cancelled!`)
                .setFooter(config.FOOTER)
                .setColor(k)
            );

          channel
            .send(
              new MessageEmbed()
                .setAuthor(
                  "New Suggestion!",
                  "https://cdn.discordapp.com/emojis/749495696821977109.gif?v=1"
                )
                .setDescription(
                  `This suggestion given by <@${
                    message.author.id
                  }>!\n\nSuggestion is **${
                    collect.first().content
                  }**\n\nThanks you soo much!`
                )
                .setColor("#f59042")
                .setFooter(config.FOOTER)
            )
            .then(
              message.channel.send(
                `Thanks for submitting a bug. Your bug has been send in channel <#${config.SUGGESTION_CHANNEL_ID}>. Server Link: https://discord.gg/Bwa6u3D8ep | For your answer`
              )
            );
        });
      } else {
        let suggestions = args.join(" ");
        channel
          .send(
            new MessageEmbed()
              .setAuthor(
                "New Suggestion!",
                "https://cdn.discordapp.com/emojis/749495696821977109.gif?v=1"
              )
              .setDescription(
                `This suggestion given by <@${message.author.id}>!\n\nSuggestion is **${suggestions}**\n\nThanks you soo much!`
              )
              .setColor("#f59042")
              .setFooter(config.FOOTER)
          )
          .then(
            message.channel.send(
              `Thanks for submitting a bug. Your bug has been send in channel <#${config.SUGGESTION_CHANNEL_ID}>. Server Link: https://discord.gg/Bwa6u3D8ep | For your answer`
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
