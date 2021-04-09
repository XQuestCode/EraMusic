const { MessageEmbed } = require("discord.js-light");
const { FOOTER } = require("../c");
const config = require("../c");
const db = require("../db");

const {NIRMAL_NAME ,DYNAMO_NAME,XDOPE_NAME } = require("../c");

module.exports = {
  name: "help",
  aliases: ["h","commands"],
  execute: async (bot, message, args) => {
    if (message.channel.type === "dm") return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = `${config.PREFIX}`;

    let k = config.COLOR;
    
    message.react("<a:music_checkDM:791581947612233738>"); 

      let help = new MessageEmbed()
     
      .setAuthor(`${bot.user.username}`, `${bot.user.displayAvatarURL()}`)
        .setTitle(`This is my all commands.`)
        .setDescription(
          `My prefix in **${message.guild.name}** is \`${prefix}\``
        )
        .addFields(
          {
            name: `\`${prefix}play <YouTube URL | Video Name>\``,
            value: `This will play songs in voice channel. | Aliases: (p,baja,bja)`,
            inline: true,
          },
          {
            name: `\`${prefix}help\``,
            value: `This will show this message. | Aliases: (h)`,
            inline: true,
          },
          {
            name: `\`${prefix}pause\``,
            value: `This will pause current running song. | Aliases: (ruk,rukja)`,
            inline: true,
          },
          {
            name: `\`${prefix}resume\``,
            value: `This will resume the song. | Aliases: (res,vapisbaja,chalu)`,
            inline: true,
          },
          {
            name: `\`${prefix}stop\``,
            value: `This will stop the current running song. | Aliases: (clearqueue,khatam,hogaya)`,
            inline: true,
          },
          {
            name: `\`${prefix}forward\``,
            value: `This will forward the current running song. | Aliases: (seek,aage)`,
            inline: true,
          },
          {
            name: `\`${prefix}search\``,
            value: `You can search a song by your self. | Aliases: (s,find,dhund,khuj)`,
            inline: true,
          },
          {
            name: `\`${prefix}jump <QueueNumber>\``,
            value: `You can jump to any song which is in queue list using it | Aliases: (j,move)`,
            inline: true
          },
          {
            name: `\`${prefix}saved\``,
            value: `This will show you, How save the whole queue. | Aliases: (save)`,
            inline: true
          },
          {
            name: `\`${prefix}join\``,
            value: `This will join your voice channel and never leave. | Aliases: (j,aaja,24/7,24x7)`,
            inline: true,
          },
          {
            name: `\`${prefix}disconnect\``,
            value: `This will leave your voice channel. | Aliases: (dc,leave,nikal,chalaja)`,
            inline: true,
          },
          {
            name: `\`${prefix}skip\``,
            value: `Using this you can skip the current playing song. | Aliases: (next,agla,aglaa)`,
            inline: true,
          },
          {
            name: `\`${prefix}sp set <Prefix>\``,
            value: `Using this you can set custom prefix of PreoMusic for your server. | Aliases: (setprefix,prefix)`,
            inline: true,
          },
          {
            name: `\`${prefix}sp reset\``,
            value: `Using this you can reset custom prefix of PreoMusic for your server. | Aliases: (prefix)`,
            inline: true,
          },
          {
            name: `\`${prefix}volume\``,
            value: `Using this you can set the current playing song volume. | Aliases: (v,vol,avaj,avaaj)`,
            inline: true,
          },
          {
            name: `\`${prefix}dj\``,
            value: `Using this you can get guide ,About how to set DJ role`,
            inline: true,
          },
          {
            name: `\`${prefix}effect\``,
            value: `You can customize effect for your music!  | Aliases: (e,f,filters)`,
            inline: true,
          },
          {
            name: `\`${prefix}queue\``,
            value: `You can check your queue songs  | Aliases: (q)`,
            inline: true,
          },
          {
            name: `\`${prefix}hindi\``,
            value: `This will show all hindi commands. | Aliases: (hindicmd,hindi commands,hindi cmds)`,
            inline: true,
          },
          {
            name: `\`${prefix}suggest <ur msg> | ${prefix}bug <ur msg>\``,
            value: `Using this you can give suggestion / bug to my dev's 
            **${NIRMAL_NAME} (<@512520979788857355>) , 
            ${DYNAMO_NAME} (<@701731392228163587>) , 
            ${XDOPE_NAME} (<@609264636231024641>).**`,
            inline: false,
          },
          {
            name: `\Links !`,
            value: `**[Suppport Server](https://discord.gg/Bwa6u3D8ep) | [invite Me](https://discord.com/oauth2/authorize?client_id=774642458889814066&permissions=8&scope=bot) | [Vote Me](https://top.gg/bot/774642458889814066/vote) | [Invite Melody](https://top.gg/bot/739725994344316968)**`,
            inline: false,
          }
        )
      
        .setColor(k)
        .setFooter(`Invite me using ${prefix}invite`);


      
      message.author.send(help);
    
  },
};


      