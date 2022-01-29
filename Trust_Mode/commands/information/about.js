const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "about",
  aliases: ["a"],
  category: "information",
  description: "desc",
  usage: "help",
  run: async (client, message, args) => {
    const about = new MessageEmbed()
      .setDescription(`> **; about**\n*it's an antinuke bot which prevents\nyour server from getting nuked.*\n\n> **; credits**\nCoded by : **Sxlitude#8885**\nGitHub: [**click here**](https://github.com/Sxlitude/antinuke)`)
      .setColor("ffdead")
    message.channel.send(about)
  }}