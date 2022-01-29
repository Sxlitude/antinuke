module.exports = {
  name: "mute",
  aliases: ["m"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("you do not have permission to mute that user. required permission is `KICK_MEMBERS`")
    } else {
      message.channel.send("i'm so bored i'll do it later") // XD
    }
  }
};