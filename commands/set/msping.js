const { MessageEmbed } = require('discord.js');
const db = require('../../core/db');

module.exports = {
  name: 'massping',
  aliases: ['mp', 'antimp', 'antimassping'],
  run: async (client, message, args) => {
    if (message.member.id !== message.guild.ownerId) {
      message.reply('You need to be the server owner to run this command.')
    } else {
      const guide = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription("***Anti Mass Mention***\n*If a member pigs several members or roles in a message, i will delete it & warn the member.*\n\n﹒*Requires antiraid enabled in your server*")
      message.channel.send({ embeds: [guide] });
    }
  }
}