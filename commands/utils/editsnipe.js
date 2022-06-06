const { MessageEmbed } = require('discord.js');
const client = require('../../index');

const editSnipe = new Map();

client.on('messageUpdate', async (oldMessage, newMessage) => {
  editSnipe.set(oldMessage.channel.id, [oldMessage, newMessage]);
});


module.exports = {
  name: 'editsnipe',
  aliases: ['es'],
  run: (client, message, args) => {
    let editSniped = editSnipe.get(message.channel.id);
     if (!editSniped) {
       message.reply(`Nothing to snipe in this channel`)
     } else {
       const sniped = new MessageEmbed()
       .setColor('PURPLE')
       .setDescription(`***Sniped!***\n\n**old message:**\n${editSniped[0]}\n\n**new message:**\n${editSniped[1]}\n\n**edited by:**\n${editSniped[0].author.tag}`);
       message.channel.send({
         embeds: [sniped]
       })
     }
  }
};