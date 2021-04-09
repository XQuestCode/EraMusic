const { MessageEmbed } = require("discord.js-light");
const { FOOTER } = require("../c");
const config = require("../c");
const db = require("../db");

module.exports = {
    name: "hindi",
    aliases: ["hindicmd" , "hindi commands","hindi cmds" ],
  execute: async (bot, message, args) => {
      
      let prefix = await db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = `${config.PREFIX}`;

    let embed = new MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setTitle(`My prefix in **${message.guild.name}** is \`${prefix}\``)
      .setDescription(`***मेरे हिंदी कमांड नीचे दिए गए हैं -*** `)    
      .addFields(        
        { name: "baja /  bajaa / ganna", value: `\`\`\`बॉट गाना बजाए गा , उदाहरण: ${prefix}baja <song name>\`\`\``, inline: false },

        { name: "nikal / chala ja", value: `\`\`\`बॉट वॉयस-चैनल छोड़ देगा\`\`\``, inline: false },

        { name: "aaja", value: `\`\`\`बॉट वॉइस-चैनल मे शामिल हैगा 24/7\`\`\``, inline: false },

        { name: "ruk / rukja", value: `\`\`\`बॉट गाना रोक देगा\`\`\``, inline: false },

        { name: "chalu /  vapisbaja / vapis baja", value: `\`\`\`बॉट गाना पुन बजाए गा\`\`\``, inline: false },

        { name: "khoj /  dhund", value: `\`\`\`बॉट आप के लिए गीत खोजें गा\`\`\``, inline: false },

        { name: "aage", value: `\`\`\`बॉट गाने को फॉरवर्ड करें गा , उदाहरण: ${prefix}aage 1:22\`\`\``, inline: false },

        { name: "agla /  aglaa", value: `\`\`\`बॉट अगला गाना बजाए गा\`\`\``, inline: false },

        { name: "hogaya / khatam", value: `\`\`\`गाने बंद कर देगा\`\`\``, inline: true },

        { name: "avaj / avaaj", value: `\`\`\` आवाज नियंत्रण करो , उदाहरण: ${prefix}avaj 60\`\`\``, inline: false },




        { name: "जल्द ही और कमांड आ रहे हैं प्रतीक्षा कीजिए", value: ` ! Enjoy all free for you , just ${prefix}invite me in your server ! Thanks ` , inline: false }

        )
      .setFooter(`Invite me using ${prefix}invite`)
      .setColor(config.COLOR);
    message.channel.send(embed);
  },
};
