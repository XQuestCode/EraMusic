const { MessageEmbed } = require("discord.js-light");
const botconfig = require("../c.js");
const fs = require("fs");
const db = require("../db.js");
const config = require("../c")

module.exports = {
  name: "sp",
  aliases: ["setPrefix" ,"setprefix","prefix"],


  execute: async (bot, message, args) => {


    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    if (message.channel.type === "dm") return;
    if (!message.member.hasPermission(["MANAGE_GUILD"]))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            "dude In order to use this command you need to have `Manage Server` Permission!"
          )
          .setColor(config.COLOR)
          .setFooter(`Invite me using ${prefix}invite`)
      );

    let k = botconfig.COLOR;
    const footer = await db.get("footer");
    if (args[0] == "add" || args[0] == 'set') {
      let data_exist = await db.get(`prefix_${message.guild.id}`);
      if (data_exist === null) {
        if (!args[1]) return message.reply("please enter a prefix.");
        if (args[1].length >= 5)
          return message.channel.send(
            `You can't make my prefix soo long. tbh make my prefx short`
          );
        db.add(`prefix_${message.guild.id}`, args[1]);

        let embed = new MessageEmbed()
          .setTitle("Prefix")
          .setColor(k)
          .setDescription(
            `My prefix in this server has been set to \`${args[1]}\``
          );
        message.channel.send(embed);
      } else {
        return message.channel.send(
          `In order to change prefix, You have to execute \`${data_exist}sp reset\`!`
        );
      }
    } else if (args[0] == "reset") {
      let data_already = await db.get(`prefix_${message.guild.id}`);
      if (data_already === null) {
        return message.channel.send(
          `This server doesn't have a custom prefix. You have to use \`${botconfig.PREFIX}\` prefix. In order to change prefix execute \`${botconfig.PREFIX}sp add <Prefix>\` No need to put \`<>\``
        );
      } else {
        db.delete(`prefix_${message.guild.id}`);
        message.channel.send(
          `Prefix of <@${bot.user.id}> has been reseted! \nIn order to change prefix execute \`${botconfig.PREFIX}sp add <Prefix>\` No need to put \`<>\``
        );
      }
    } else {
      let embed111 = new MessageEmbed()
        .setTitle(`Set Prefix Commands Help Menu.`)
        .addFields(
          {
            name: `${prefix}sp set <Prefix>`,
            value: `You can set my custom prefix using this. Note: No need to add \`< >\``,
          },
          {
            name: `${prefix}sp reset`,
            value: `You can set my reset prefix using this. Note: No need to add \`< >\``,
          }
        )
        .setColor("GREEN");
      message.channel.send(embed111);
    }
  },
};
