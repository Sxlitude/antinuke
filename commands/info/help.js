// Button Pagination and Discord.js
const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../../index");

// Database
const Database = require("@replit/database");
const db = new Database();

// Settings
const Settings = require('../../files/settings.js');
const prefix = Settings.bot.prefix;

// Command
module.exports = {
  name: "help",
  aliases: ['h'],
  run: async (client, message, args) => {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`${Settings.bot.invLink}`),
      new MessageButton()
        .setLabel("Support Server")
        .setStyle("LINK")
        .setURL(`${Settings.credits.supportServer}`)
    )
    const help = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__HELP MENU__**\n\nHere is a list of plugins you can enable or disable in the server. You can run a plugin's name or a name from commands to get more information. \n\n***EXAMPLES***\n﹒*Plugins* :: \`${prefix}antinuke\`\n﹒*Commands* :: \`${prefix}moderation\`\n\n***PLUGINS***\n﹒*Antinuke*\n﹒*Antiraid*\n\n***COMMANDS***\n﹒*Moderation*`)
    // Sending
    message.channel.send({ embeds: [help], components: [button] });
  },
};