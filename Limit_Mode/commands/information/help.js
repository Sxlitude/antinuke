const { MessageEmbed } = require('discord.js');
const chalk = require('chalk')
module.exports = {
  name: "help",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setDescription(` **; ANTINUKE**
 ﹒*limits*, *set*, *reset*
 ﹒*enable*, *disable*, *tips*
 
 **; MODERATION**
 ﹒*ban*, *unban*, *banlist*
 ﹒*kick*, *mute*, *unmute*
 
 **; INFORMATION**
 ﹒*help*, *about*`)
      .setImage('https://cdn.discordapp.com/attachments/937605807237906454/937613693066301450/unknown.png')
      .setFooter(`made with love by Sxlitude#8885`)
      .setColor("9400d3")
    message.channel.send(help)
    console.log(chalk.blueBright(`[!]: Command => Help\n[!]: Author => ${message.author.tag}\n[!]: Server => ${message.guild.name}\n`))
  }
};