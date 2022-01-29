const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "prefix",
  aliases: ["p", "setprefix"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      const newPrefix = args[0];
      let prefix = await db.get(`prefix_${message.guild.id}`)
      if (prefix === null) prefix = "nothing";

      if (newPrefix) {
        if (newPrefix === prefix) {
          message.channel.send(`**${message.author.username}, ** that prefix is already set.`)
        } else {
          await db.set(`prefix_${message.guild.id}`, newPrefix);
          message.channel.send(`Ok **${message.author.username}**, i've set the new prefix to **${newPrefix}** for **${message.guild.name}**`);
        }
      } else { message.channel.send(`:grey_question: Current custom prefix for the server is   **\`${prefix}\`**`) }
    } else { message.channel.send(`**${message.author.username},** You are not the server owner to do that.`) }
  }
};