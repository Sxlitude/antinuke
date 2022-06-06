const { MessageEmbed } = require('discord.js');
const client = require('../../index');

sniped = new Map();

client.on('messageDelete', async (message) => {
  sniped.set(message.channel.id, message);
});

module.exports = {
  name: 'snipe',
  aliases: [],
  run: (client, message, args) => {
    let del = sniped.get(message.channel.id);
    if (!del) {
      message.reply(`Nothing to snipe in this channel.`)
    } else {
      const sniped = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`***Sniped!***\n\n**message:**\n${del}\n\n**sent by:**\n${del.author.tag}`);

      message.channel.send({
        embeds: [sniped]
      })
    }
  }
};

