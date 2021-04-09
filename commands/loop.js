const { MessageEmbed } = require('discord.js-light');

const distube = require('../index.js');
const config = require('../c')
const db = require('../db.js')


const dbl = require('../dbl.js');

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    execute: async(bot, message, args) => {
        if(message.channel.type === 'dm') return;
    
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;
const footer = await db.get('footer');
    



dbl.hasVoted(message.author.id).then(async v => {
    if(v == true) {




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


      if (!distube.isPlaying(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
          .setFooter(`Invite me using ${prefix}invite`)
          .setColor(config.COLOR)
      );

    if(message.member.voice.channel.id == message.guild.me.voice.channel.id)  {
    

        let mode = null;
       
        switch(args[0]) {
            case "off":
                mode = 0
            break
            case "song":
                mode = 1
            break
            case "queue":
                mode = 2
            break
            default :
                return  message.channel.send(new MessageEmbed().addFields(
                    {
                        name: `\`${prefix}loop off\``,
                        value: 'This will use to turn off the loop!',
                        inline: true
                    }, {
                        name: `\`${prefix}loop song\``,
                        value: "This will turn on loop for the current playing song",
                        inline: true
                    }, {
                        name: `\`${prefix}loop queue\``,
                        value: "This will turn on loop for queue!",
                        inline: true
                    }
                ).setColor(k))    
            }
            mode = distube.setRepeatMode(message, mode);
            
            mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
            message.channel.send(`I've set repeat mode to:  \`${mode}\``);
        
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
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          `This command is locked!\n\nYou've to vote PreoMusic on top.gg if you want to unlock this command.\nLink: [Here](https://top.gg/bot/774642458889814066/vote)`
        )
        .setColor(config.COLOR)
    );
  }
})




}
}