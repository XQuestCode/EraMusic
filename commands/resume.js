const { canModifyQueue } = require("../util/PreobotUtil");
const {EMOJI_DONE} = require('../config.json');

module.exports = {
  name: "resume",
  aliases: ["r","start","vapisbaja","vapis baja"],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error), message.react(EMOJI_DONE);
    }

    return message.reply("The queue is not paused.").catch(console.error);
  }
};


console.log("Resume working")
