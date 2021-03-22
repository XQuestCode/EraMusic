const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");
const {EMOJI_ERROR ,EMOJI_LINE } = require('../config.json')
module.exports = {
  name: "np",
  aliases: ["nowplaying"],
  description: "Show now playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(`${EMOJI_ERROR} There is nothing playing.`).catch(console.error);

    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle("Now playing")
      .setDescription(`**[${song.title}](${song.url})**`)
      .setColor("#000001")
      .setAuthor(message.client.user.username);

    if (song.duration > 0) {
      nowPlaying.addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          `${EMOJI_LINE}` +
          createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          `${EMOJI_LINE}` +
          (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );
      nowPlaying.setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8));
    }

    return message.channel.send(nowPlaying);
  }
};
console.log("NowPlaying working")