const { canModifyQueue } = require("../util/PreobotUtil");
const {EMOJI_DONE} = require('../config.json');

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;

    message.react(EMOJI_DONE);
    return queue.textChannel.send(`Loop is now ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);  
  }
};


console.log("Loop working")