const distube = require("../index");
const db = require("../db");
const config = require("../c");
const { MessageEmbed } = require("discord.js-light");
const createBar = require('string-progressbar');
const { formatDuration, toSecond } = require('distube/src/duration.js')



module.exports = {
  name: "np",
  aliases: ["nowPlaying", "nowplay", "nowplaying"],
  execute: async (bot, message, args) => {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = `${config.PREFIX}`;
    
    if (message.channel.type === "dm") return;
    const footer = await db.get("footer");
    if (!message.member.voice.channel)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `${config.EMOJI_ERROR} You haven't joined the voice channel.`
          )
          .setTimestamp()
          .setColor(config.COLOR)
          .setFooter(`Thanks for using PreoMusic`)
      );

    if (!distube.isPlaying(message))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(`${config.EMOJI_ERROR} My queue list is empty!`)
          .setFooter(`Thanks for using PreoMusic`)
          .setColor(config.COLOR)
      );


    if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
        

        
      let queue = distube.getQueue(message);
      let song = queue.songs;
      let currentMilliseconds = queue.currentTime;
      let totalMiliiseconds = queue.duration * 1000;
    
      let baaar = createBar(totalMiliiseconds, currentMilliseconds, 24, "▬", "🔵")
      console.log(baaar)
      let embed = new MessageEmbed()
        .setTitle(`Now Playing:`)
        .setFooter(`Thanks for using PreoMusic`)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setColor(config.COLOR)
        .setDescription(
          `[${song.map((a) => a.name)}](${song.map(
            (m) => m.url
          )})\n\nDuration: \`${song.map((m) => m.formattedDuration)}\` | Filter: \`${queue.filter || "Off"}\`\n Requested by: <@${queue.songs.map((m) => m.user.id)}>\n\n\`${formatDuration(currentMilliseconds)}\` \`${baaar[0]}\` \`${formatDuration(totalMiliiseconds)}\``
        );
        

      message.channel.send(embed);
    } else {
      let k = config.COLOR;
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `I'm playing songs on another channel. If you want to listen song you could add my 2 more bots by executing \`${prefix}invite\` command.`
          )
          .setTimestamp()
          .setColor(k)
          .setFooter(`Thanks for using PreoMusic`)
      );
    }
  },
};
