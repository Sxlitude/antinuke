const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "enable",
  aliases: ["antinuke on", "antinuke yes", "antinuke enable"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    // Variable
    let status = await db.get(`antinuke_${message.guild.id}`)
    if (status === null) status = "off"
    // Command
    if (!message.author.id === message.guild.ownerID) {
      message.channel.semd(`only **${message.guild.owner.user.username}** can enable antinuke in this server.`)
    } else {
      if (status === "on") {
        message.channel.send("antinuke is already enabled for this server.")
      } else {
        await db.set(`antinuke_${message.guild.id}`, "on")
        await message.channel.send('antinuke is now enabled for this server.')
      }
    }
  }
};