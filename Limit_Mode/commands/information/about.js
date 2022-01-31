const { MessageEmbed } = require('discord.js');
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
 ﹒bot's source code is *[here](https://github.com/Sxlitude/antinuke)*
 
 **; STATS**
 ﹒**${client.guilds.cache.size}** servers protected
 ﹒**${client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)}** users protected
 
 **; INFO**
  ﹒language: **JavaScript**
  ﹒source code: **[Click Here](https://github.com/Sxlitude/antinuke)`)
      .setFooter(`made with love by Sxlitude#8885`)
      .setColor("c71585")
    message.channel.send(help)
  }
};