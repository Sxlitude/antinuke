const client = require("../../index");
const chalk = require("chalk");

client.on("ready", () => {
    //console.log(chalk.redBright(`${Startup.Ascii}`));
    console.log(chalk.redBright(`[!]: Logged in as ${client.user.tag}`));
    client.user.setActivity({ name: ";help", type: "LISTENING" });
});