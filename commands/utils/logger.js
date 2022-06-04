const { MessageEmbed } = require('discord.js');
const db = require('../../core/db');

module.exports = {
  name: 'dmlogger',
  aliases: ['notifications', 'notifs', 'logger'],
  run: async (client, message, args) => {
    if (message.author.id != message.guild.ownerId) {
      message.reply('⚠️ This command is for owner only.')
    } else {
      const guide = new MessageEmbed()
        .setDescription('***DM Logger***\n*If this setting is set to true, you will get notifications in DMs from me about unauthorized actions.*\n\n﹒*Usage* :: logger on/off\n﹒*Requires Server Ownership*')
        .setColor('PURPLE')

      const logger = await db.get(`logger_${message.guild.id}`);
      const x = args[0];
      if (!x) {
        message.channel.send({
         // content: message.guild.id,
          embeds: [guide]
        });
      } else {
        if (x === 'on') {
          if (logger === true) {
            message.channel.send({
              content: 'Logger is enabled already.'
            })
          } else {
            await db.set(`logger_${message.guild.id}`, true);
            message.channel.send({
              content: '👍 enabled the logger!'
            })
          }
        } else if (x === 'off') {
          if (logger !== true) {
            message.channel.send({
              content: 'Logger is disabled already.'
            }) 
          } else {
            await db.delete(`logger_${message.guild.id}`);
            message.channel.send('👍 disabled the logger!')
          }
        }
      }
    }
  }
}