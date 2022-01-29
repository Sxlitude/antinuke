const db = require("quick.db")

const Database = require('@replit/database')
const db1 = new Database()
module.exports = {
  name: "untrust",
  aliases: ["utr"],
  category: "information",
  description: "desc",
  usage: "yess",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      let settings = await db1.get(`antinuke_${message.guild.id}`)
      if (settings === null) settings = "off";
      if (settings === "off") {
        message.channel.send("to untrust users, enable antinuke first.")
      } else {
        let user = message.mentions.users.first()
        if (!user) {
          message.channel.send("mention someone first.")
        } else {
          let database = db.get(`trustedusers_${message.guild.id}`)
          if (database) {
            let data = database.find(x => x.user === user.id)
            if (!data) return message.channel.send("mentioned user wasn't even trusted.")

            let value = database.indexOf(data)
            delete database[value]

            var filter = database.filter(x => { return x != null && x != '' })
            db.set(`trustedusers_${message.guild.id}`, filter)
            message.channel.send(`untrusted **${user.username}** sucessfully.`)
          } else { message.channel.send("i'm unable to find that user in the trusted list") }
        }
      }
    } else { message.channel.send(`only **${message.guild.owner.user.username}** can untrust users in this server.`) }
  }
}