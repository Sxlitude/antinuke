const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
  client = require("../../index"),
  db = require('../../core/db');

module.exports = {
  name: "list",
  aliases: ['l', 'trusted', 'whitelisted'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.reply({ content: ':warning: you are not allowed to run this command.' });
    } else {
      const antinuke = await db.get(`${message.guild.id}_antinuke`);
      if (!antinuke) {
        message.reply({ content: ':warning: you need to enable antinuke to run this command.' });
      } else {
        await db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            message.reply(':warning: there are no whitelisted users.')
          } else {
            const users = data.whitelisted;
            const mentions = [];
            
            if (users.length !== 0) {
              users.forEach(userId => mentions.push(`<@${userId}> (${userId})`));
              const whitelisted = new MessageEmbed()
                .setColor('#2C2F33')
                .setDescription(`__**Whitelisted Users in ${message.guild.name}**__\n\n${mentions.join('\n')}`);
              message.channel.send({ embeds: [whitelisted] });
            } else {
              message.reply(':grey_question: there are no whitelisted users in this server.')
            }
          }
        });
      }
    }
  },
};