const { Client, CommandInteraction } = require("discord.js");
const db = require('../../core/db.js');

module.exports = {
  name: "unwhitelist",
  description: "unwhitelist a user",
  options: [
    {
      name: 'user',
      description: 'the user to unwhitelist',
      type: "USER",
      required: true
    }
  ],
  type: 'CHAT_INPUT',
  run: async (client, interaction, args) => {
    if (interaction.user.id === interaction.guild.ownerId) {
      const [userId] = args;
      const antinuke = await db.get(`${interaction.guild.id}_antinuke`);

      if (!antinuke) {
        interaction.reply({ content: ':warning: you need to enable antinuke to run this command.', ephemeral: true });
      } else {
        await db.get(`${interaction.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await db.set(`${interaction.guild.id}_wl`, { whitelisted: [] });
            await interaction.reply({ content: ':warning: an error has occured to run this command. please run it again or re-add the bot.' });
          } else {
            if (!data.whitelisted.includes(userId)) {
              await interaction.reply({ content: 'that user is not whitelisted.' });
            } else {
              await db.pull(`${interaction.guild.id}_wl.whitelisted`, userId);
              await interaction.reply({ content: ':thumbsup: that user is now unwhitelisted.' });
            }
          }
        })
      }
    } else {
      await interaction.reply({
        content: 'This command is for the server owner'
      })
    }
  },
};