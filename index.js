const Discord = require("discord.js-light");
const { MessageEmbed } = require("discord.js-light");
const usermap = new Map();
const db = require('./db.js')


const bot = new Discord.Client({
  cacheGuilds: true,
  cacheChannels: true,
  cacheOverwrites: false,
  cacheRoles: true,
  cachePresences: true,
  disableMentions: "everyone",
  fetchAllMembers: false,
  disabledEvents: [
    "messageUpdate",
    "messageDeleteBulk",
    "channelCreate",
    "channelUpdate",
    "channelDelete",
    "channelPinsUpdate",
    "roleCreate",
    "roleDelete",
    "roleUpdate",
    "emojiCreate",
    "emojiUpdate",
    "emojiDelete",
    "guildBanAdd",
    "guildBanRemove",
    "webhookUpdate",
    "typingStart",
    "presenceUpdate",
    "guildIntegrationsUpdate",
    "guildMemberUpdate",
    "guildMemberRemove",
    "guildMemberAdd",
  ],
});

const ms = require("parse-ms");
const fs = require("fs");
const path = require("path");
const Music_second = require("distube");

const config = require("./c");


const { PREFIX, EMOJI_DONE , STATUSCONFIG } = require("./c");
const distube = new Music_second(bot, {
  searchSongs: false,
  emitNewSongOnly: false,
  highWaterMark: 1 << 26,
  leaveOnFinish: false,
  leaveOnStop: false,
  youtubeDL: false,
  updateYouTubeDL: false,
  leaveOnEmpty: false,   // dynamo - yt api - AIzaSyDMuyQ3oTraYfuuu0WrS9Avi8KclHPb7MA   // nirmal backup api - AIzaSyDVpWxV8g9mAYaeEfbv1kFGyp-Kvy7gvzg      /    AIzaSyAKmfGCHVwI_FnIk7hDopcqtciptCXxih8
  youtubeIdentityToken: "ODEzNTI1NjU5MjQyMzMyMTkw.YDQkzw.pB5tmNWw-J16TnJoyjmGVzLHxrA",
  youtubeCookie: "VISITOR_INFO1_LIVE=mlrjZPHw_Ck; CONSENT=YES+IN.en+202004; _gcl_au=1.1.469244244.1604482226; NID=204=DMtTgvQ9X-PTS1Qn-Fi63pEaXNxA-r3QD-Y08DmZqlnYjB8U7zqN5FbaAUfCDB9LtYexvsWrzTDKh9wkls988YvM3PsEjMaJTq96cVTwCDCxKzGB7avjlrZxr3RSmVikK4COVBzD86l8KaPa7PDiajDmPzIFuifDGYkHpmf9LaY; __Secure-3PAPISID=BCgGhJFarjzN87Rh/AYNoEBacBpn1VyydA; __Secure-3PSID=4AfDI1F75OjYFmN0CONMVOdk3SAWJoVMzG8ID5HYHZs8MOWUJ2GOg1vGlHZ0unbvk1nXMw.; PREF=f6=80&al=en&f4=4000000; __Secure-3PSIDCC=AJi4QfG9eICMGiWksf8sW3UFevikhVSn7ykidNvXnFvJvLWKl2m-knWfVjMy5adZOlDDQ4Puk3jr; GPS=1",
  
  // Dynamo set this all to // ok 
    customFilters: {
    clear: "dynaudnorm=f=200",
    bassboost: "bass=g=20,dynaudnorm=f=200",
    "8D": "apulsator=hz=0.08",
     vaporwave: "aresample=48000,asetrate=48000*0.8",
     nightcore: "aresample=48000,asetrate=48000*1.25",
     phaser: "aphaser=in_gain=0.4",
     tremolo: "tremolo",
     vibrato: "vibrato=f=6.5",
     reverse: "areverse",
     treble: "treble=g=5",
     normalizer: "dynaudnorm=f=200",
     surrounding: "surround",
     pulsator: "apulsator=hz=1",
     subboost: "asubboost",
     karaoke: "stereotools=mlev=0.03",
     flanger: "flanger",
     gate: "agate",
     haas: "haas",
     mcompand: "mcompand",
     },

// idhar tak oke 


});
const cooldowns = new Discord.Collection();
bot.login(config.TOKEN); //Here bot logged in!
bot.on("ready", async () => {
  console.log(
    `${bot.user.username} Logged in with ${bot.guilds.cache.size} servers and ${bot.users.cache.size} users!`
  );
  bot.user.setActivity(`${STATUSCONFIG}`)

});



// idhar all join vc cmd 



module.exports = distube;
bot.commands = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const commandFiles = fs
  .readdirSync(path.join(__dirname, "Commands"))
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, "Commands", `${file}`));
  bot.commands.set(command.name, command);
  console.log(`${command.name} is running!`);
}

bot.on("message", async (message) => {
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    var prefix = config.PREFIX;
  } else {
    var prefix = await db.get(`prefix_${message.guild.id}`);

    if (prefix === null) prefix = config.PREFIX;
  }
  const prefixRegex = new RegExp(
    `^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

  const commandName = args.shift().toLowerCase();
 

    const command =
      bot.commands.get(commandName) ||
      bot.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
  
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
  
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `Please wait for ${timeLeft.toFixed(1)} second(s) before using the commands.`
        );
      }
    }
  
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(bot, message, args);
    } catch (error) {
      console.error(error);
      message
        .reply("There was an error executing that command.")
        .catch(console.error);
    }

});


bot.on("guildCreate", (guild) => {
  let channel = config.SERVER_JOINED;
  let embed = new MessageEmbed()
    .setTitle("Joined a New Server!")

                         // |    Nirmal ID      |       Quest
    .setDescription(`Hey, <@512520979788857355> , <@679561036646449178>  look I've joined a new server!`)
    .addFields(
      {
        name: "Server Name: ",
        value: `${guild.name}`,
      },
      {
        name: "Server Owner Tag",
        value: `(${guild.owner.user})`,
      },
      {
        name: "Total Member Count: ",
        value: `${guild.members.cache.size - 1} + 1`,
      }
    )
    .setColor(config.COLOR)
    .setThumbnail(guild.iconURL());
  bot.channels.cache.get(channel).send(embed);
});
bot.on("guildDelete", (guild) => {
  let channel = config.SERVER_LEAVE;
  let embed = new MessageEmbed()
    .setTitle("Left Server!")
    .setDescription(

           // |    Nirmal ID      |       Quest
      `Hey, <@512520979788857355> , <@679561036646449178> look Someone kicked me from his server <a:innocent_:778168998566428682>`
    )
    .addFields(
      {
        name: "Server Name: ",
        value: `${guild.name}`,
      },
      {
        name: "Server Owner Tag",
        value: `(${guild.owner.user})`,
      },
      {
        name: "Total Member Count: ",
        value: `${guild.members.cache.size - 1} + 1`,
      }
    )
    .setColor(config.COLOR)
    .setThumbnail(guild.iconURL());
  bot.channels.cache.get(channel).send(embed);
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = config.PREFIX;
  let embed11 = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setDescription(
      `My prefix in **${message.guild.name}** is \`${prefix}\`. You can play music by joining a voice channel and typing \`${prefix}play\`. The command accepts song names, video links, and playlist links. Type \`${prefix}help\` to see full commands list!\nThanks to **NIRMAL#8432(<@512520979788857355>) , DynamoYT#1000(<@701731392228163587>) , xDope#2788(<@609264636231024641>)** , who developed me! Join my [Support Server](https://discord.gg/Bwa6u3D8ep)`
    )
    .setColor("RED")
    .setFooter(config.FOOTER);

  if (message.content === `<@${bot.user.id}>`) {
    return message.channel.send(embed11);
  }
  if (message.content === `@${bot.user.tag}`) {
    return message.channel.send(embed11);
  }
  if (message.content === `${bot.user.tag}`) {
    return message.channel.send(embed11);
  }
});

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

distube.on("playSong", async (message, queue, song) => {
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = config.PREFIX;
  let k = config.COLOR;
  const footer = await db.get("footer");

 
    
  let thise = new MessageEmbed()
    .setTitle(`Now Playing:`)
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor(config.COLOR)
    .setFooter(`Invite me using ${prefix}invite`)
    .setDescription(
      `[${song.name}](${song.url})\n\nRequested by: <@${song.user.id}> | Duration: \`${song.formattedDuration}\`\n`
    );
  
  message.channel.send(thise)
});

distube.on("addSong", async(message, queue, song) => {
  var prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = config.PREFIX;
  let k = config.COLOR;
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `${config.EMOJI_DONE} Successfully added [${song.name}](${song.url}) in my queue list!\n Duration: \`${song.formattedDuration}\` | Added By:  <@${message.author.id}>`
      )
      .setColor(k)
      .setTitle("Added in queue:")
      .setFooter(`Queue stuck? Try "${prefix}jump <QueueNumber>"`)
  );
});
distube
  // DisTubeOptions.searchSongs = true
  .on("finish", (message) => {
    message.channel.send(
      new MessageEmbed().setColor(config.COLOR).setDescription(
        `${EMOJI_DONE} I've played all the songs now my queue list is empty!`
      )
    );
  });
distube.on("error", (message, err) => {
  console.log(err);
  message.channel.send(
    new MessageEmbed()
      .setDescription(
        `I got an error:\n\n\`\`\`${err}\`\`\`\n\nReport this to my developer [Click Here](https://discord.gg/Bwa6u3D8ep)`
      )
      .setColor(config.COLOR)
  );
});

distube.on('initQueue', queue => {
  queue.autoplay = false
})

distube.on('playList', async(message, queue, playlist, song) => {
  const footer = await db.get("footer");
  var prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = config.PREFIX;

  let embed = new Discord.MessageEmbed()
  .setAuthor(bot.user.username, bot.user.displayAvatarURL())
  .setTitle(`Now Playing`)
  .setDescription(`Playing the saved queue with the code \`${playlist.name}\`\nTotal songs: \`${playlist.songs.length}\``)
  .setColor(config.COLOR)
  .setFooter(`Invite me using ${prefix}invite`);
message.channel.send(embed);
  let thise = new MessageEmbed()
  .setTitle(`Now Playing:`)
  .setAuthor(bot.user.username, bot.user.displayAvatarURL())
  .setColor(config.COLOR)
  .setDescription(
    `[${song.name}](${song.url})\n\nRequested by: <@${song.user.id}> | Duration: \`${song.formattedDuration}\`\n`
  )
  .setFooter(`Invite me using ${prefix}invite`);
  message.channel.send(thise)
});

distube.on('addList', async(message, queue, playlist) => {

  var prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = config.PREFIX;
  
  const footer = await db.get("footer");
  
  var prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = config.PREFIX;

  let embed = new Discord.MessageEmbed()
  .setTitle(`Added in Queue:`)
  .setDescription(
    `Your saved queue has been added in queue list!\nQueue Code: \`${playlist.name}\` | Total Songs: \`${playlist.songs.length}\``
  )
    .setColor(config.COLOR).setFooter(footer);
    message.channel.send(embed)

})


bot.once("ready", async () => {

  console.log(`Joined all VC's !`)

  let guildID = bot.guilds.cache
    .keyArray()
   .forEach(async function (item, index) {
    let channelID = await db.get(`channel0_${item}`);
  if (channelID == null) {
   return;
    } else {
    bot.channels.cache.get(channelID).join();
      }
      });
    });



    

process.on('unhandledRejection', (err) => {
  let webhook = new Discord.WebhookClient('829967073429553162', 't1wHa080NXcYCDzW_pHJmeatcNpjs8PNO3ES7y2jeOR2JA46dO9NSUgDC9wX2C4SLdg3')
  webhook.send(`> -> ${err}`)
  return;
})

