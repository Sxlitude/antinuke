const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'features',
  aliases: ['f'],
  run: async (client, message, args) => {
    const features = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription('***PROTECTION FEATURES***\n\n﹒*anti channel create*\n﹒*anti channel update*\n﹒*anti channel delete*\n\n﹒*anti role create*\n﹒*anti role update*\n﹒*anti role delete*\n\n﹒*anti emoji create*\n﹒*anti emoji update*\n﹒*anti emoji delete*\n\n﹒*anti webhook create*\n﹒*anti webhook update*\n﹒*anti webhook delete*\n\n﹒*anti server update*\n﹒*anti bot addition*\n\n﹒*anti member kick*\n﹒*anti member update*\n﹒*anti member ban*')
    message.channel.send({
      embeds: [features]
    })
  }
}