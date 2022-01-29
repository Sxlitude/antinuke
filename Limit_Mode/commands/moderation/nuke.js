const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "nuke",
  aliases: ["n"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const channel = message.channel;
    let limits = await db.get(`nukelimit_${message.author.id}`)
    if (limits === null) limits = 0;
    if (limits < 5) {
      if (!message.member.permissions.has("MANAGE_CHANNELS")) {
        message.channel.send("you do not have permission to manage channels.")
      } else {
        // Limits
        await db.set(`nukelimit_${message.author.id}`, limits + 1).then((limit) => {
          setTimeout(() => {
            if (limit === 0) {
              return;
            } else {
              db.set(`nukelimit_${message.author.id}`, limit - 1)
            }
          }, 3600000) // 3600000 -> One Hour
        })
        // Nuke
        const channel = message.channel;
        await channel.delete();
        await channel.clone().then((c) => { c.send("nuked this channel") });
      }
    } else {
      message.channel.send("you can only nuke **five times** per hour. nuke later.")
    }
  }
};