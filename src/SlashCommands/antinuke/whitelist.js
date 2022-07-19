const { Client, CommandInteraction } = require("discord.js");
const db = require('../../core/db.js');

module.exports = {
  name: "whitelist",
  description: "whitelist a user",
  options: [
    {
      name: 'user',
      description: 'the user to whitelist',
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
            if (data.whitelisted.includes(userId)) {
              await interaction.reply({ content: 'that user is already whitelisted.' });
            } else {
              await db.push(`${interaction.guild.id}_wl.whitelisted`, userId);
              await interaction.reply({ content: ':thumbsup: that user is now whitelisted.' });
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