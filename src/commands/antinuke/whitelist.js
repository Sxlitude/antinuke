const { MessageEmbed } = require("discord.js"),
  db = require('../../core/db');

module.exports = {
  name: 'trust',
  aliases: ['wl', 'whitelist'],
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
            .setDescription('***Trust Command***\nIf your admins are trusted, i will ignore whatever they do in your server. They won\'t get punished for doing actions.\n\n﹒Usage :: trust @user\n﹒Requires Server Ownership');
          
          message.channel.send({ embeds: [guide] });
          
        } else {
          const ID = user.id;
          const whitelisted = await db.get(`${message.guild.id}_wl_${user.id}`);

          if (whitelisted) {
            message.channel.send({ content: `That user is already whitelisted` });
          } else {
            await db.set(`${message.guild.id}_wl_${ID}`, true)
            await message.reply({ content: `**${user.username}** is now whitelisted` })
          }
        }
      } else {
        message.channel.send({ content: `To run this command, enable antinuke first.` });
      }
    }
  },
}