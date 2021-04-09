const { MessageEmbed } = require("discord.js-light");
const { FOOTER } = require("../c.js");
const config = require("../c.js");
const db = require("../db.js");
const dbl = require('../dbl.js');

module.exports = {
  name: "dj",
  aliases: ["DJ"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;
    
    let footer = await db.get("footer");
    dbl.hasVoted(message.author.id).then(async m => {
      if(m) {

     
      if (!message.member.hasPermission(["MANAGE_GUILD"]))
        return message.channel.send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              "In order to use this command you need to have `Manage Server` Permission!"
            )
            .setColor(config.COLOR)
            .setFooter(`Invite me using ${prefix}invite`)
        );

      if (args[0] === "set") {
        let k = config.COLOR;
        
        let checking2 = await db.get(`djcheck_${message.guild.id}`);
        if (checking2 === null)
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_ERROR} First you have to enable DJ role for this server.\n\`Try ${prefix}dj enable\` command.`
              )
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );

        let role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[0]);

        if (!role) {
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Error!")
              .setDescription(`Please mention a role.`)
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );
        }
        let checking = await db.get(`djrole_${message.guild.id}`);

        if (checking == null) {
          db.add(`djrole_${message.guild.id}`, role.id);
          let k = config.COLOR;
          
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_DONE} Role <@&${role.id}> has been successfully set as DJ role.\n**Handy Dandy Tips:** If you want to reset DJ role of this server just execute \`${prefix}dj reset\``
              )
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );
        } else {
          let k = config.COLOR;
         
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`Error!`)
              .setDescription(
                `${config.EMOJI_ERROR} This server already have a DJ Role.\n**Handy Dandy Tips:** In order to change DJ role of this server then execute \`${prefix}dj reset\` to reset DJ role of this server then execute \`${prefix}dj set\` to set DJ role for this server! `
              )
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );
        }
      } else if (args[0] === "reset") {
        let k = config.COLOR;
      
        let checking2 = await db.get(`djcheck_${message.guild.id}`);
        if (checking2 === null)
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_ERROR} First you have to enable DJ role for this server.\n**Handy Dandy Tips:** Try \`${prefix}dj enable\` command.`
              )
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );
        db.delete(`djrole_${message.guild.id}`);
        return message.channel.send(
          new MessageEmbed()
            .setTitle(`DJ Command`)
            .setDescription(
              `${config.EMOJI_DONE} DJ Role of this server has been reset!\n**Handy Dandy Tips:** In Order to set DJ Role for this server then execute \`${prefix}dj set @Role\``
            )
            .setColor(k)
            .setFooter(`Invite me using ${prefix}invite`)
        );
      } else if (args[0] == "enable") {
        let checking1 = await db.get(`djcheck_${message.guild.id}`);

        if (checking1 == null) {
         
          let k = config.COLOR;
          db.add(`djcheck_${message.guild.id}`, message.guild.id);
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_DONE} Now Only Peoples who have Dj role that can use \`stop\`, \`skip\` and \`resume\` commands`
              )
              .setColor(k)
              .setFooter(`Invite me using ${prefix}invite`)
          );
        } else {
          
          
          let k = config.COLOR;
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_DONE} DJ Role only turned on already.\n\n**Handy Dandy Tips:** Try \`${prefix}dj disable\` to turn it off`
              )
              .setFooter(`Invite me using ${prefix}invite`)
              .setColor(k)
          );
        }
      } else if (args[0] == "disable") {
        let checking = await db.get(`djcheck_${message.guild.id}`);

        if (checking == null) {
          let k = config.COLOR;
          
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_DONE} DJ Role only turned off already.\n\n**Handy Dandy Tips:** Execute \`${prefix}dj enable\` to enable it back!`
              )
              .setFooter(`Invite me using ${prefix}invite`)
              .setColor(k)
          );
        } else {
          let k = config.COLOR;
          
          db.delete(`djcheck_${message.guild.id}`);
          return message.channel.send(
            new MessageEmbed()
              .setTitle(`DJ Command`)
              .setDescription(
                `${config.EMOJI_DONE} Now Everyone can use all commands!`
              )
              .setFooter(`Invite me using ${prefix}invite`)
              .setColor(k)
          );
        }
      } else {
        let k = config.COLOR;
        
        return message.channel.send(
          new MessageEmbed()
            .setTitle("DJ Command")
            .addFields(
              {
                name: `\`${prefix}dj enable\``,
                value: `This command will turn on DJ role only for a server.`,
              },
              {
                name: `\`${prefix}dj disable\``,
                value: `This command will turn off DJ role only for a server.`,
              },
              {
                name: `\`${prefix}dj set @Role\``,
                value: `This command will add a role as DJ role for this server`,
              },
              {
                name: `\`${prefix}dj reset\``,
                value: `This command will reset the DJ role of this server`,
              }
            )
            .setColor(k)
            .setFooter(`Invite me using ${prefix}invite`)
        );
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
