const { MessageEmbed, Message } = require("discord.js-light");
const pages = require("discord-paginationembed");
const distube = require("../index.js");
const config = require("../c");
const db = require("../db.js");
const dbl = require("../dbl.js");
const Discord = require("discord.js");
new (require("discord-pagination"))(Discord);

/**
 * @param {Discord.Message} message
 */

module.exports = {
  name: "save",
  aliases: ["saved"],
  cooldown: 3,
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;
    const footer = await db.get("footer");
    var prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix == null) prefix = config.PREFIX;

    dbl.hasVoted(message.author.id).then(async (c) => {
      if (c == true) {
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
              .setFooter(`Thanks for using PreoMusic`)
          );

        if (!message.guild.me.voice.channel) {
          await message.member.voice.channel.join();
        }
        db.set(`channel_${message.guild.id}`, message.member.voice.channel.id);

        if (!distube.isPlaying(message)) {
          await message.member.voice.channel.join();
        }

        if (
          message.member.voice.channel.id == message.guild.me.voice.channel.id
        ) {
          if (args[0] === "save" || args[0] === "create") {
            let queue = distube.getQueue(message);
            if (!queue) {
              return message.channel.send(`There is nothing playing.`);
            }
            let a = queue.songs.map((song, i) => {
              return `${song.url}`;
            });

            const rand = Math.random().toString(16).substr(2, 10);
            db.push(`queue_${message.author.id}`, rand);
            db.push(`${rand}`, a);
            return message.channel.send(
              `This queue with **${a.length}** songs has been saved in my database with the code \`${rand}\`\nIf you want to load a queue then type: \`${prefix}save load <Code>\``
            );
          } else if (args[0] === "show") {
            let user = message.author;
            let b = await db.get(`queue_${user.id}`);

            if (b == null || b.length === 0) {
              b = `You don't have any saved queue`;
            } else {
              b = `\`${b.join(", ")}\``;
            }

            message.channel.send(
              new MessageEmbed()
                .setColor(config.COLOR)
                .setDescription(`Your all saved queue codes:\n\n${b}`)
            );
          } else if (args[0] === "load") {
            let code = args[1];
            if (!code) {
              return message.channel.send(`You haven't mentioned a code.`);
            }

            let a = await db.get(`${args[1]}`);
            if (a == null) {
              return message.channel.send(
                `No saved queue find with the code \`${args[1]}\`, Make sure you've type the correct code!`
              );
            }

            let userDB = await db.get(`queue_${message.author.id}`);
            if (userDB == null) {
              return message.channel.send(`You haven't created any queue.`);
            }
            console.log(userDB);
            if (!userDB.includes(args[1])) {
              return message.channel.send(
                `This is not your code dude, make your own`
              );
            }

            console.log(a);
            distube.playCustomPlaylist(message, a, { name: `${args[1]}` });
          } else if (args[0] === "delete") {
            let code = args[1];
            if (!code) {
              return message.channel.send(`You haven't mentioned a code.`);
            }

            let check_in_db = await db.get(`${code}`);
            if (check_in_db == null) {
              return message.channel.send(
                `This code isn't present in my database.`
              );
            }

            let user_DB = await db.get(`queue_${message.author.id}`);
            if (!user_DB) {
              return message.channel.send(`You don't have any saved queue.`);
            }
            console.log(user_DB);
            if (!user_DB.includes(`${code}`)) {
              return message.channel.send(
                `This is not your code, so you can't delete it.`
              );
            }
            db.pull(`queue_${message.author.id}`, code);
            db.delete(`${code}`)
            return message.react(config.EMOJI_DONE);
          

          } else if(args[0] === 'remove'){


            

          
        } else {
            let embed = new MessageEmbed()
              .setDescription(
                `These are my command for saving a queue:\n\n\`${prefix}save create\`\nThis will save the queue.\n\n\`${prefix}save load <code>\`\nThis will save the queue.\n\n\`${prefix}save show\`\nThis will show your all saved queue codes.\n\n\`${prefix}save delete <code>\`\nThis will delete the saved queue.`
              )
              .setColor(config.COLOR);
            return message.channel.send(embed);
          }
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
      } else {
        return message.channel.send(
          new MessageEmbed()
            .setDescription(
              `This command is locked!\n\nYou've to vote PreoMusic on top.gg if you want to unlock this command.\nLink: [Here](https://top.gg/bot/774642458889814066/vote)`
            )
            .setColor(config.COLOR)
        );
      }
    });
  },
};

