const { Message, MessageEmbed } = require("discord.js-light");
const distube = require("../index");
const config = require("../c");
const db = require("../db");

module.exports = {
  name: "jump",
  aliases: ["move", "j","skipto","st"],
  execute: async (bot, message, args) => {
    if (message.channel.type == "dm") return;

    const footer = await db.get("footer");
    var prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;


    let servercheck = await db.get(`djcheck_${message.guild.id}`);



    if (servercheck == null) {  // server check on here 


    
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

    if (!distube.isPlaying(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );


/// here alll main things to skip to sdfgsdfsdf

    

  
  // oke 




  
  if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
    let queue = await distube.getQueue(message);
    let queue_lenght = queue.songs.length;

    if(queue_lenght >= parseInt(args[0])) {
      distube.jump(message, parseInt(args[0]));
      return message.react(config.EMOJI_DONE);
      
      } else {
      return message.channel.send(new MessageEmbed().setDescription(`${config.EMOJI_ERROR} That's not a valid number.`));
    }
  }



     /// here it turn off the server check latest one ! 




    
    }

    else {
      let k = config.COLOR;
      let DJROLe = await db.get(`djrole_${message.guild.id}`);
      if (DJROLe == null) {
        
        return message.channel.send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              `${config.EMOJI_ERROR} DJ only enabled on this server but you've to set a role as DJ role!\n**Handy Dandy Tips:** Try \`${prefix}dj set @Role\` to set this role!`
            )
            .setColor(k)
            .setFooter(config.FOOTER)
            .setTimestamp()
        );
      }
    
      else {
        let k = config.COLOR;
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;
        let DJROLe = await db.get(`djrole_${message.guild.id}`);
  
        if (
          !message.member.roles.cache.has(DJROLe)
        )
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Error!")
              .setDescription(`${config.EMOJI_ERROR} You don't have DJ role`)
              .setColor(k)
              .setFooter(config.FOOTER)
      
      
              );
    
  
  //// okee 
      }


      if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
        let queue = await distube.getQueue(message);
        let queue_lenght = queue.songs.length;
    
        if(queue_lenght >= parseInt(args[0])) {
          distube.jump(message, parseInt(args[0]));
          return message.react(config.EMOJI_DONE);
          
          } else {
          return message.channel.send(new MessageEmbed().setDescription(`${config.EMOJI_ERROR} That's not a valid number.`));
        }
      }

      
  }



  

  // done all set 

  },
};

