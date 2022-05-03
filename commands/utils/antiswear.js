const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "antiswear",
  aliases: ["as"],
  run: async (client, message, args) => {
    var msgCount = await db.get(`msgCount_${message.author.id}`);
    if (msgCount === null) msgCount = 0;
    
    const soon = new MessageEmbed()
      .setDescription("***Hold On!***\n﹒*This command is coming soon!*")
      .setColor("PURPLE")
    
    const guide = new MessageEmbed()
      .setDescription("***Antiswear Module***\n*I'll prevent users from sending messages which contains words you block.*\n\n﹒*Add a word* :: antiswear add *word*\n﹒*Remove a word* :: antiswear remove *word*\n﹒*Check list of words* :: antiswear list\n﹒*Requires Admin Permissions*")
      .setColor("PURPLE")

    const option = args[0];
    if (option == "add") {
      const word = args[1];
      if (!word) {
        message.channel.send({ content: "provide me a word to blacklist please." });
      } else {
        let word = await db.get(`${msgCount}_${message.guild.id}`);
        if (word) {
          message.channel.send({ content: "that word is already blacklisted.." });
        } else {
          await db.set(`${msgCount}_${message.guild.id}`, `${word}`);
          message.channel.send({ content: "blacklisted the word successfully!" });
        }
      }
    } else if (option == "remove") {
      message.channel.send({ embeds: [soon] });
    } else if (option == "list") {
      message.channel.send({ embeds: [soon] });
    } else {
      message.channel.send({ embeds: [soon] });
    }
  }
}