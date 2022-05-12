const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database")
const db = new Database();


module.exports = {
  name: 'uptime',
  aliases: ['up'],
  run: async (client, message, args) => {
    const Uptime = await db.get(`uptime`);
    const uptime = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`this bot started <t:${Uptime}:R>`)

    message.channel.send({
      embeds: [uptime]
    })
  }
}