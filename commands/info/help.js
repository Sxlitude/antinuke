// Button Pagination and Discord.js
const { Message, Client, MessageEmbed } = require("discord.js");
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
  run: async (client, message, args) => {;
    const embed2 = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__COMMANDS__**\n\nHere is a list of commands you can probably use. Since it's a security bot, Maximum commands are for Owner / Admin only.\n\n***Antinuke***\n> ﹒enable\n> ﹒disable\n> ﹒trust\n> ﹒untrust\n> ﹒list\n\n***Moderation***\n> ﹒ban\n> ﹒kick\n> ﹒nick\n\n***Utility***\n> ﹒autorole\n> ﹒welcomer\n\n***Information***\n> ﹒help\n> ﹒about\n> ﹒ping\n_ _`)
    // Sending
    message.channel.send({ embeds: [embed2]});
  },
};