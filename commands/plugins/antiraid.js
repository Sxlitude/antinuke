// Button Pagination and Discord.js
const { Message, Client, MessageEmbed } = require("discord.js");
const client = require("../../index");

// Database
const db = require('../../core/db');

// Settings
const Settings = require('../../core/settings.js');
const prefix = Settings.bot.prefix;

// Command
module.exports = {
  name: "antiraid",
  aliases: ['anr'],
  run: async (client, message, args) => {
    const guide = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__ANTIRAID__**\n\n*This plugin, if enabled, protects your server from raid actions like anti-alts, anti-massping, anti massjoin, etc. Only admins can configure this plugin*\n\n***ACTIVATION***\n﹒to enable :: \`${prefix}antiraid enable\`\n﹒to disable :: \`${prefix}antiraid disable\`\n\n***COMMANDS***\n﹒*antialt*\n﹒*massping*\n﹒*massjoin*\n\n***STATUS***\n﹒*This plugin is in development. The commands will be available soon.*`)

    message.channel.send({ embeds: [guide] });
  },
};