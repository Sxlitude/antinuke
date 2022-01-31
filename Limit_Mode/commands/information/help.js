const { MessageEmbed } = require('discord.js');
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
 ﹒*kick*, *mute*, *unmute*`)
      .setFooter(`made with love by Sxlitude#8885`)
      .setColor("9400d3")
    message.channel.send(help)
  }
};