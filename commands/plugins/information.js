const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'information',
  aliases: ['info'],
  run: async (client, message, args) => {
    const info = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`**__INFORMATION__**\n\n*Here are some commands which comes under the Information category of the bot.*\n\n***COMMANDS***\n﹒*invite*\n﹒*about*\n﹒*ping*`)

    message.channel.send({ embeds: [info] })
  }
}