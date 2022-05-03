const { Client, MessageEmbed, MessageButton, CommandInteraction } = require("discord.js");
module.exports = {
  name: "help",
  description: "The help command for antinuke",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const help = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__COMMANDS__**\n\nHere is a list of commands you can probably use. Since it's a security bot, Maximum commands are for Owner / Admin only.\n\n***Antinuke***\n> ﹒enable\n> ﹒disable\n> ﹒trust\n> ﹒untrust\n> ﹒list\n\n***Moderation***\n> ﹒ban\n> ﹒kick\n> ﹒nick\n\n***Utility***\n> ﹒autorole\n> ﹒welcomer\n\n***Information***\n> ﹒help\n> ﹒about\n> ﹒ping`)

    interaction.followUp({ embeds: [help], ephemeral: true });
  },
};