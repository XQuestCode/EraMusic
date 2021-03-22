module.exports = {
    name: "restart",
    aliases: ["blast"],

    execute: async (client, message, args) => {
        if (message.author.id !== '512520979788857355') {
            return message.channel.send(`Only <@512520979788857355> Can Use This Command.`)
        }
        await message.channel.send(`Restarting bot :)`)
        process.exit();
    }
}