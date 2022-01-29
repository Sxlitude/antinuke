const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "enable",
  aliases: ["antinuke enable"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      let settings = await db.get(`antinuke_${message.guild.id}`) 
      if (settings === null) settings = "off";
      if (settings ==="off") {
        await db.set(`antinuke_${message.guild.id}`, "on")
        await message.channel.send("enabled the antinuke for this server sucessfully")
      } else if (settings === "on") {
        message.channel.send("antinuke is enabled for this server already")
      }
    } else {
      message.channel.send("you're not the owner to run this command.")
    }
  }
};