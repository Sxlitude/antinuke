const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
  name: "about",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setDescription(` **; CREDITS**
 ﹒bot coded by *Sxlitude#8885*
 ﹒*send friend request to this moron*
 
 **; STATS**
 ﹒**${client.guilds.cache.size}** servers protected
 ﹒**${client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)}** users protected
 
 **; INFO**
  ﹒ping: **${client.ws.ping}ms**
  ﹒language: **JavaScript**
  ﹒source code: **[Click Here](https://github.com/Sxlitude/antinuke)**`)
      .setImage('https://cdn.discordapp.com/attachments/937605807237906454/937614766229315584/unknown.png')
      .setFooter(`made with love by Sxlitude#8885`)
      .setColor("9f00ff")
    message.channel.send(help)
    console.log(chalk.blueBright(`[!]: Command => About\n[!]: Author => ${message.author.tag}\n[!]: Server => ${message.guild.name}\n`))
  }
};