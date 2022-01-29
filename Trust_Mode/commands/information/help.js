const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setDescription(` **; ANTINUKE:**
 ﹒*trust*, *untrust*, *trusted*
 ﹒*enable*, *disable*, *tips*
 
 **; MODERATION:**
 ﹒*ban*, *unban*, *banlist*
 ﹒*kick*, *mute*, *unmute*`)
      .setColor("9400d3")
    message.channel.send(help)
  }
};