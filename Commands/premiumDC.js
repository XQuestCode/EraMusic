const db = require("../db.js");
const config = require("../c");
const distube = require("../index");
const { MessageEmbed } = require("discord.js-light");

module.exports = {
  name: "premiumdisconnect",
  aliases: ["predc" ,"1090dc"],
  execute: async (bot, message, args) => {
    // Nirmal , Dynomo , xDope
  let ownerID = ["512520979788857355", "679561036646449178"];
  if(!ownerID.includes(message.author.id)) return;

let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    if (!message.member.voice.channel) {
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
    }
    if (message.guild.me.voice.channel == null) return;
    if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
      if (distube.isPlaying(message)) {
        distube.stop(message);
        message.member.voice.channel.leave();
        message.react(config.EMOJI_DONE);
        return db.delete(`channel0_${message.guild.id}`);
      } else if (!distube.isPlaying(message)) {
        message.member.voice.channel.leave();
        message.react(config.EMOJI_DONE);

        return db.delete(`channel0_${message.guild.id}`);
      }
    } else {
      let k = config.COLOR;
      return message.channel
        .send(
          new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              `ERROR - join our Support Server for more info - https://discord.gg/Bwa6u3D8ep`
            )
            .setTimestamp()
            .setColor(k)
            .setFooter(`Invite me using ${prefix}invite`)
        )
       
        
    }
  },
};
