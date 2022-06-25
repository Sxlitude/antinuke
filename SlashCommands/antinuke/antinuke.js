const { MessageEmbed } = require("discord.js");
const db = require('../../core/db.js');

module.exports = {
  name: "whitelisted",
  description: "shows the list of whitelisted admins",
  type: 'CHAT_INPUT',
  run: async (client, interaction, args) => {
    await db.list(`${interaction.guild.id}_wl`).then(async (keys) => {
      if (!keys.length) {
        await interaction.followUp({
          content: 'there are no trusted users for this server',
          ephemeral: true,
        })
      } else {
        const users = [];
        for (x in keys) {
          const mentions = array[x],
            userId = mentions.split('_')[2],
            user = `<@${userId}> (${userId})`;
          users.push(user);
        }
        const list = new MessageEmbed()
          .setColor('PURPLE')
          .setDescription(`**__Whitelisted admins for this server__**\n\n${users.join('\n')}`);
        await interaction.followUp({
          embeds: [list],
          ephemeral: true
        })
      }
    })
  },
};