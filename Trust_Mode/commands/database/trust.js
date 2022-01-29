const db = require('quick.db');

const Database = require('@replit/database')
const db1 = new Database()
module.exports = {
  name: "trust",
  aliases: ["tr"],
  category: "database",
  description: "desc",
  usage: "yes",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      let settings = await db1.get(`antinuke_${message.guild.id}`)
      if (settings === null) settings = "off";
      if (settings === "off") {
        message.channel.send("to trust users, enable antinuke first.")
      } else {
        let user = message.mentions.users.first()
      if (!user) {
        message.channel.send("mention someone first.")
      }
      let trustedusers = db.get(`trustedusers_${message.guild.id}`)
      if (trustedusers && trustedusers.find(find => find.user == user.id)) {
        return message.channel.send(`they're already trusted.`)
      }
      let data = { user: user.id };
      db.push(`trustedusers_${message.guild.id}`, data)
      return message.channel.send(`trusted **${user.username}** sucessfully.`)
      }
    } else {
      message.channel.send(`only **${message.guild.owner.user.username}** can trust users in this server.`)
    }
  }
}