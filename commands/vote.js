const { MessageEmbed } = require('discord.js-light');
const { COLOR } = require('../c');
const db = require('../db');
const config = require("../c");


module.exports = {
  name: "vote",
  aliases: ["voted"],
  execute: async (bot, message, args) => {

    const footer = await db.get("footer");
    message.channel.send(
      new MessageEmbed().setDescription(
        `Vote me and unlock features of this bot!\n\nLink: [Vote Me here](https://top.gg/bot/774642458889814066/vote)`
      ).setColor(COLOR).setFooter(`Thanks for using PreoMusic !`)
    );
  },
};
