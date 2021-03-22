const { canModifyQueue } = require("../util/PreobotUtil");
const { EMOJI_DONE } = require('../config.json');

module.exports = {
  name: "stop",
  aliases: ["band","khatam","hogaya"],
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ stopped the music!`).catch(console.error);

    return message.react(EMOJI_DONE);
  }
};


console.log("Stop working")