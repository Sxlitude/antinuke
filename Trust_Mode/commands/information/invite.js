const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "invite",
  aliases: ["inv"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setDescription(`[Click Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
      .setColor("bc8f8f")
    message.channel.send(help)
  }
};