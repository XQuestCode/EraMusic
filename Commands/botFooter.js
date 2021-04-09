const config = require("../c");
const db = require("../db");

module.exports = {
  name: "bot",
  aliases: ["setfooter"],
  execute: async (bot, message, args) => {
    if (message.channel.type == "dm") return;

    if (!config.OWNER_ID.includes(message.author.id)) return;

    let footer = args.join(" ");

    db.add(`footer`, footer);

    message.channel.send(`Done, the embed footer changed to **${footer}** !`);
  },
};
