const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "disable",
  aliases: ["antinuke off", "antinuke no", "antinuke disable"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    // Variable
    let status = await db.get(`antinuke_${message.guild.id}`)
    if (status === null) status = "off"
    // Command
    if (message.author.id !== message.guild.ownerID) {
      message.channel.send(`only **${message.guild.owner.user.username}** can disable antinuke in this server.`)
    } else {
      if (status === "off") {
        message.channel.send("antinuke is already disabled for this server.")
      } else {
        await db.set(`antinuke_${message.guild.id}`, "off")
        await message.channel.send('antinuke is now disabled for this server.')
      }
    }
  }
};