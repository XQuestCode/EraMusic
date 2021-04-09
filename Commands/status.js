const config = require("../c");
const db = require("../db")



module.exports = {
    name: "status",
    aliases: ["presence"],
    execute: async(bot, message, args) => {


        var prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = `${config.PREFIX}`;

        // let ownerID = ['512520979788857355'];

        // Nirmal , Dynomo , xDope
        let ownerID = ["512520979788857355", "679561036646449178"];


        if(!ownerID.includes(message.author.id)) return;

        let modes = args[0];
        let status = args.slice(1).join(" ")
        if(modes == "1") {
            bot.user.setActivity(status, { type: "PLAYING" })
            // return;
            return  message.react(config.EMOJI_DONE) , message.reply("Done Boss i've changed my status.")

        } else if(modes == "2") {
            bot.user.setActivity(status, { type: "LISTENING" })
            // return;
            return message.react(config.EMOJI_DONE), message.reply("Done Boss i've changed my status.")

        } else if(modes == "3") {
            bot.user.setActivity(status, { type: "WATCHING" })
            // return;
            return message.react(config.EMOJI_DONE), message.reply("Done Boss i've changed my status.")
        } else {


         

        }
    }
}