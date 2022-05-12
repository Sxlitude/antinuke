const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'welcomer',
  aliases: ['welc'],
  run: async (client, message, args) => {
    const guide = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription('**__WELCOMER__**\n\n*This plugin has commands related to welcoming new members. Run a command to get more help about it*\n\n***COMMANDS***\n﹒*autorole*\n﹒*channel*\n\n***STATUS***\n﹒*This plugin is always enabled for now.*')
    message.channel.send({
      embeds: [guide]
    })
  }
}