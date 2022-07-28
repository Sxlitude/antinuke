const { MessageEmbed } = require("discord.js"),
  db = require('../../core/db');

module.exports = {
  name: 'trust',
  aliases: ['wl', 'whitelist'],
  run: async (client, message, args) => {
    const wl = new MessageEmbed()
      .setColor('#2C2F33')
      .setDescription('**_whitelist_**\n﹒run the command `;whitelist @user`\n﹒whitelisted admins __can__ bypass antinuke')
    
    if (message.author.id !== message.guild.ownerId) {
      message.reply({ content: 'this command is for the server owner.' });
    } else {
      const antinuke = await db.get(`${message.guild.id}_antinuke`);
      if (!antinuke) {
        message.reply({ content: ':warning: you need to enable antinuke to run this command.' });
      } else {
        await db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            message.reply({ content: ':warning: an error has occured to run this command. please run it again or re-add the bot.' });
          } else {
            const user = message.mentions.users.first();
            if (!user) {
              message.reply({ embeds: [wl] });
            } else {
              const userId = user.id;
              
              if (data.whitelisted.includes(userId)) {
                message.reply({ content: 'that user is already whitelisted.' });
              } else {
                await db.push(`${message.guild.id}_wl.whitelisted`, userId);
                message.reply({ content: 'that user is now whitelisted.' });
              }
            }
          }
        })
      }
    }
  }
}