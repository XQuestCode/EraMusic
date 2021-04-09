const config = require("../c");
const { MessageEmbed } = require("discord.js-light");
const db = require("../db");
module.exports = {
  name: "inv",
  aliases: ["invite", "invites", "inv"],
  execute: async (bot, message, args) => {
    let k = config.COLOR;
    const footer = await db.get("footer");
    let embed = new MessageEmbed()

      .setFooter(`Thanks For Using PreoMusic !`)
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setTitle(`Invite Me !`)
      .setColor(k)
      .addFields(

        {
          name: "AUEMusic",
          value: `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=813525659242332190&permissions=8&scope=bot)`,
          inline: true,
        },
        {
          name: "PreoMusic",
          value: `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=774642458889814066&permissions=8&scope=bot)`,
          inline: true,
        },
        {
          name: "PreoMusic 2",
          value: `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=783231563580047360&permissions=8&scope=bot)`,
          inline: true,
        },
        {
          name: "PreoMusic 3",
          value: `[Invite Me](https://discord.com/api/oauth2/authorize?client_id=786866748355510273&permissions=8&scope=bot)`,
          inline: true,
        },
          {
            name: "Support Server",
            value: `[Join my support server!](https://discord.gg/Bwa6u3D8ep)`,
            inline: true,
          },
      );
    message.channel.send(embed);
  },
};
