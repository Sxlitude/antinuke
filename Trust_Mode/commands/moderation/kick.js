//INITIALIZATION
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  category: "moderation",
  description: "Kicks the mentioned member",
  usage: "kick <@user> <reason>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("you do not have permission to kick members")
    } else {
      const target = message.mentions.members.first();
      if (!target.bannable) {
        message.channel.send("i can't ban that user.")
      } else {
        await target.ban({ reason: "null" })
        await message.channel.send("banned")
      }
    }
  }
};
