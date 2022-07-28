const { MessageEmbed } = require("discord.js"),
  db = require('../../core/db');

module.exports = {
  name: 'untrust',
  aliases: ['unwhitelist', 'uwl'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `*This command is only for the server owner` });
    } else {
      const enabled = await db.get(`${message.guild.id}_antinuke`);
      if (enabled === true) {
        const user = message.mentions.users.first();
        if (!user) {
          const guide = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription("***Untrust Command***\n*You can untrust your admins by this command. If you do so, they can get banned for doing actions in your server.*\n\n﹒*Usage* :: untrust @user\n﹒*Requires Server Ownership*");

          message.reply({ embeds: [guide] })

        } else {
          const ID = user.id;
          const whitelisted = await db.get(`${message.guild.id}_wl_${user.id}`);

          if (!whitelisted) {
            message.reply({ content: `That user is not whitelisted` });
          } else {
            await db.delete(`${message.guild.id}_wl_${ID}`)
            await message.reply({ content: `**${user.username}** is now unwhitelisted` })
          }
        }
      } else {
        message.reply({ content: `To run this command, enable antinuke first.` });
      }
    }
  },
}