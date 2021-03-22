const fs = require("fs");
const {EMOJI_DONE} = require('../config.json');

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Toggle pruning of bot messages",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("There was an error writing to the file.").catch(console.error);
      }

      return message.channel
        .send(`Message pruning is ${config.PRUNING ? "**enabled**" : "**disabled**"}`) 

        
        .catch(console.error), message.react(EMOJI_DONE);

        
    });
  }
};


console.log("Pruning working")