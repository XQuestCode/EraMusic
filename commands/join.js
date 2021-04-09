const distube = require('../index.js');
const config = require('../c.js');
const { MessageEmbed } = require('discord.js-light');
const db = require('../db.js')


const dbl = require('../dbl.js');


module.exports = {
    name: "join",
    aliases: ["j", "247", "24/7", "24x7" , "aaja"],
    execute: async(bot, message, args) => {

        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;

        dbl.hasVoted(message.author.id).then(async v => {
            if(v == true) {

// let set only manage guild can join the bot to vc , oke

        // if (!message.member.hasPermission(["MANAGE_GUILD"]))
        // return message.channel.send(
        //   new MessageEmbed()
        //     .setTitle("Error!")
        //     .setDescription(
        //       "In order to use this command you need to have `Manage Server` Permission!"
        //     )
        //     .setColor("RED")
        //     .setFooter(`Invite me using ${prefix}invite`)
        // );


 // here we set is the bot is playing music or not or is it is another channal !
        if(!distube.isPlaying(message)) {
            await message.member.voice.channel.join()
           
            // db.set(`channel_${message.guild.id}`, message.member.voice.channel.id)
           
            return message.react(config.EMOJI_DONE)
        } else {
            
            let k = config.COLOR;
            message.react(config.EMOJI_ERROR)
            return message.channel.send(new MessageEmbed().setFooter(config.FOOTER).setTitle("Error!").setDescription(`<@${message.author.id}> Sorry, I'm busy on another channel. Add my 2 more bots by executing \`${prefix}invite\` !`).setTimestamp().setColor(k))
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