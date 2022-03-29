const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "help",
  description: "see wikis, commands & more",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {

    // Embed
    const Help = new MessageEmbed()
      .setDescription(`soon`)
      .setColor("9400d3")

    // Menu
    
    interaction.followUp({ embeds: [Help], ephemeral: true })
  },
};