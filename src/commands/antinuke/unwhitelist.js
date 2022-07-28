const { MessageEmbed } = require("discord.js"),
  db = require('../../core/db');

module.exports = {
  name: 'untrust',
  aliases: ['uwl', 'unwhitelist'],
  run: async (client, message, args) => {
    
    const uwl = new MessageEmbed()
      .setColor('#2C2F33')
      .setDescription('**_unwhitelist_**\n﹒run the command `;unwhitelist @user`\n﹒non-whitelisted admins can trigger antinuke');
    
    if (message.author.id !== message.guild.ownerId) {
      message.reply({ content: 'you are not allowed to run this command.' });
    } else {
      const antinuke = await db.get(`${message.guild.id}_antinuke`);
      if (!antinuke) {
        message.reply({ content: 'you need to enable antinuke to run this command.' });
      } else {
        await db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            message.reply({ content: ':warning: an error has occured to run this command. please run it again or re-add the bot.' });
          } else {
            const user = message.mentions.users.first();
            if (!user) {
              message.reply({ embeds: [uwl] });
            } else {
              const userId = user.id;
              
              if (!data.whitelisted.includes(userId)) {
                message.reply({ content: 'that user is not whitelisted.' });
              } else {
                await db.pull(`${message.guild.id}_wl.whitelisted`, userId);
                message.reply({ content: ':thumbsup: that user is now unwhitelisted.' });
              }
            }
          }
        })
      }
    }
  }
}