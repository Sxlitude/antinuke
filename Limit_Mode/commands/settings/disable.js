const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "disable",
  aliases: ["antinuke disable"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      let settings = await db.get(`antinuke_${message.guild.id}`) 
      if (settings === null) settings = "off";
      if (settings ==="on") {
        await db.set(`antinuke_${message.guild.id}`, "off")
        await message.channel.send("disabled the antinuke for this server sucessfully")
      } else if (settings === "off") {
        message.channel.send("antinuke is disabled for this server already")
      }
    } else {
      message.channel.send("you're not the owner to run this command.")
    }
  }
};