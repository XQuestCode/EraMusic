
module.exports = {
    name: 'reload',
    aliases: ["REFRESH"],
    execute: async(bot, message, args) => {
                        
                      // |    Nirmal ID      |     XQuest

         let OWNER_ID = ["512520979788857355", "679561036646449178"];

if(!OWNER_ID.includes(message.author.id)) return;
        const commandName = args[0].toLowerCase();
        const command = bot.commands.get(commandName)
            || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            const newCommand = require(`./${commandName}.js`);
            bot.commands.set(newCommand.name, newCommand)
            return message.channel.send(`done`);
        }

        delete require.cache[require.resolve(`./${commandName}.js`)];

        try {
            const newCommand = require(`./${commandName}.js`);
            bot.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.log(error);
            return message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
        }
        message.channel.send(`Command \`${commandName}\` was reloaded!`);
    },
};