const { MessageEmbed, Message } = require("discord.js-light");
const Discord = require("discord.js-light");

const distube = require("../index.js");
const config = require("../c");
const db = require("../db.js");
module.exports = {
  name: "queue",
  cooldown: 3,
  aliases: ["q"],
  execute: async (bot, message, args) => {

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    if (message.channel.type === "dm") return;
    const footer = await db.get("footer");

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
    if (!distube.isPlaying(message)) {
      return message.channel.send(`The queue is empty ;-;`, { code: "css" });
    }

    let o = 0;
    
    let queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(`The queue is empty ;-;`, { code: "css" });
    let q = queue.songs.map((song, i) => {
      return ` ${i === 0 ? `${o}) Now Playing: ` : `${i}`} [${song.name}] - ${
        song.formattedDuration
      }`;
    });
    

    let msg = await message.channel.send(
      `${queue.songs
        .slice(0, 10)
        .map((songs, i) => `${i === 0 ? `${o})` : `${i})`} ${songs.name.slice(0, 35) + '…'}`)
        .join("\n")}`, {code: "css"}
    );

    if (queue.songs.length > 10) {
      const reaction1 = await msg.react("◀");
      const reaction2 = await msg.react("▶");

      let first = 0;
      let second = 10;

      const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

      collector.on('collect', (r) => {
        const reactAdd = queue.songs.slice(first + 10, second + 10).length;
        const reactRemove = queue.songs.slice(first - 10, second - 10).length;

        if (r.emoji.name === '▶' && reactAdd !== 0) {
          r.users.remove(message.author.id);

          first += 10;
          second += 10;
          msg.edit(`${queue.songs.slice(first, second).map((songs, i) => `${i === 0 ? `${o})` : `${i})`} ${songs.name.slice(0, 35) + '…'}`).join("\n")}`, {code: "css"})

        } else if (r.emoji.name === '◀' && reactRemove !== 0) {
          r.users.remove(message.author.id);

          first -= 10;
          second -= 10;

          msg.edit(`${queue.songs.slice(first, second).map((songs, i) => `${i === 0 ? `${o})` : `${i})`} ${songs.name.slice(0, 35) + '…'}`).join('\n')}`, { code: "css" });

        }
      })
      collector.on('end', () => {
        reaction1.users.remove();
        reaction2.users.remove();
      });
    }
  },
};

