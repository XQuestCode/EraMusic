

if (command === "restart") {
    if (message.author.id !== "679561036646449178") return false;
    message.reply("Restarting...");
    process.destroy();
    require("child_process").exec("node index.js");
};
