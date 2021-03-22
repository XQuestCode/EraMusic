const { canModifyQueue } = require("../util/PreobotUtil");
const {EMOJI_DONE} = require('../config.json');
module.exports = {
  name: "skip",
  aliases: ["next","agla"],
  description: "Skip the currently playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("There is nothing playing that I could skip for you.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error);

     return message.react(EMOJI_DONE);
  }
};


console.log("Skip working")