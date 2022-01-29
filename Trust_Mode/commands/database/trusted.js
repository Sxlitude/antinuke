const Discord = require("discord.js")
const db = require("quick.db")

const Database = require('@replit/database')
const db1 = new Database()

module.exports = {
  name: "trusted",
  aliases: ["list"],
  category: "information",
  description: "desc",
  usage: "help",
  run: async (client, message, args) => {
    let settings = await db1.get(`antinuke_${message.guild.id}`)
    if (settings === null) settings = "off";
    if (settings === "off") {
      message.channel.send("to see the list, enable antinuke first.")
    } else {
      let trustedlist = new Discord.MessageEmbed()
        .setFooter("trusted users' list")
      let database = db.get(`trustedusers_${message.guild.id}`)
      if (database && database.length) {
        let array = []
        database.forEach(m => {
          array.push(`<@${m.user}>`)
        }); trustedlist.addField('** Trusted Members:\n **', `${array.join("\n")}`)
        message.channel.send(trustedlist);
      } else { message.channel.send("there are no trusted users in this server.") }
    }
  }
}