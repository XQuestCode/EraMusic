const { MessageEmbed } = require('discord.js-light');

const { isPaused } = require('../index.js');
const distube = require('../index.js');
const config = require('../c');
const db = require('../db.js');
module.exports = {
    name: "resume",
    aliases: ["res" ,"chalu","vapisbaja", "vapis baja"],
   execute: async(bot, message, args) => {
    if(message.channel.type === 'dm') return;
    
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;
        
    var footer = await db.get("footer");

    let serverCheck = await db.get(`djcheck_${message.guild.id}`);
    if(serverCheck == null) {

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

      if (!distube.isPaused(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} No song is pause.`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );

    if(message.member.voice.channel == message.guild.me.voice.channel)  {

        if(distube.isPaused(message)) {
            message.react(config.EMOJI_DONE)
            return distube.resume(message)

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
          .setFooter(`Invite me using ${prefix}invite`)
      )
      .catch(
        message.channel.send(
          `I don't have permission to send embed messages.`
        )
      );

    }
} else {
    let djrole = await db.get(`djrole_${message.guild.id}`);
    if(djrole == null) {
        let k = config.COLOR;
        let prefix = await db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = `${config.PREFIX}`;
          return message.channel.send(new MessageEmbed().setTitle("Error!").setDescription(`${config.EMOJI_ERROR} DJ only enabled on this server but you've to set a role as DJ role!\n**Handy Dandy Tips:** Try \`${prefix}dj set @Role\` to set this role!`).setColor(k).setFooter(config.FOOTER).setTimestamp())
    } else {
      let k = config.COLOR;
        let djrole = await db.get(`djrole_${message.guild.id}`);
        if(!message.member.roles.cache.has(djrole))  return message.channel.send(new MessageEmbed().setTitle("Error!").setDescription(`${config.EMOJI_ERROR} You don't have DJ role`).setColor(k).setFooter(config.FOOTER)) 


     

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

      if (!distube.isPaused(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} No song is paused.`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );
    

    if(message.member.voice.channel == message.guild.me.voice.channel)  {

        if(distube.isPaused(message)) {
            message.react(config.EMOJI_DONE)
            return distube.resume(message)

        } 
    } else {
       let k = config.COLOR;
        let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;

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
    }
}
}
}