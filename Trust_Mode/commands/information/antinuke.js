const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "antinuke",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    let status = await db.get(`antinuke_${message.guild.id}`)
    if (status === null) status = "off"

    if (status === "off") {
      message.channel.send("antinuke is currently **disabled** for this server");
    } else if (status === "on") {
      message.channel.send("antinuke is currently **enabled** for this server");
    }
  }
};