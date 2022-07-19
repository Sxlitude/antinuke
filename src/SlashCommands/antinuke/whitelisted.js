const { MessageEmbed } = require("discord.js");
const db = require('../../core/db.js');

module.exports = {
  name: "whitelisted",
  description: "shows the list of whitelisted admins",
  type: 'CHAT_INPUT',
  run: async (client, interaction, args) => {
    if (interaction.user.id === interaction.guild.ownerId) {
      const antinuke = await db.get(`${interaction.guild.id}_antinuke`);
      if (!antinuke) {
        await interaction.reply({ content: ':warning: you need to enable antinuke to run this command.' });
      } else {
        await db.get(`${interaction.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await db.set(`${interaction.guild.id}_wl`, { whitelisted: [] });
            await interaction.reply(':warning: there are no whitelisted users.')
          } else {
            const users = data.whitelisted;
            const mentions = [];
            
            if (users.length !== 0) {
              users.forEach(userId => mentions.push(`<@${userId}> (${userId})`));
              const whitelisted = new MessageEmbed()
                .setColor('PURPLE')
                .setDescription(`__**Whitelisted Users in ${interaction.guild.name}**__\n\n${mentions.join('\n')}`);
              await interaction.reply({ embeds: [whitelisted], ephemeral: true });
            } else {
              await interaction.reply(':grey_question: there are no whitelisted users in this server.')
            }
          }
        });
      }
    } else {
      await interaction.reply({
        content: 'This command is for the server owner.'
      })
    }
  },
};