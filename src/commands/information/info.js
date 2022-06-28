const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'about',
  aliases: ['info', 'botinfo'],
  run: async (client, message, args) => {
    message.reply({
      embeds: [new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`This discord bot is an open-source project. You an star my GitHub repo if you love my work. 

**CREDITS**
﹒This bot is coded by Sxlitude#8885
﹒[Click Here](https://discord.gg/KMw8stwEuN) for official server of this bot.
﹒To invite this bot, [click me](https://dsc.gg/antiwizz)!

**BOT INFO**
﹒Owner :: Sxlitude
﹒Library :: discord.js
﹒Latency :: ${client.ws.ping}ms`)]
    })
  }
}
