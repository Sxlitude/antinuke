// Button Pagination and Discord.js
const { MessageEmbed } = require("discord.js");
const client = require("../../index");

// Database
const db = require('../../core/db');

// Settings
const Settings = require('../../core/settings.js');
const prefix = Settings.bot.prefix;

// Command
module.exports = {
  name: "antinuke",
  aliases: ['an'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({
        content: "This command is for owner only."
        })
    } else {
    var status;
    const antinuke = await db.get(`antinuke_${message.guild.id}`);
    if (antinuke === true) status = "enabled";
    if (antinuke !== true) status = "disabled";
    
    const guide = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__ANTINUKE__**\n\n*This plugin, if enabled, sets strict restrictions on performing actions in your server. Only admin you trust can do actions on your server. Run any command to get deeper knowledge of it.*\n\n***ACTIVATION***\n﹒to enable :: \`${prefix}antinuke enable\`\n﹒to disable :: \`${prefix}antinuke disable\`\n\n***COMMANDS***\n﹒*trust*
﹒*untrust*\n﹒*list*\n﹒*features*\n\n***STATUS***\n﹒*Antinuke is ${status} in this server.*`)

    const option = args[0];
    if (option === "enable"||
       option === "true") {
      if (antinuke === true) {
        message.channel.send({ content: "Antinuke is already enabled in this server." });
      } else {
        await db.set(`antinuke_${message.guild.id}`, true);
        message.channel.send({ content: "Done! Antinuke is now enabled in this server." });
      }
    } else if (option === "disable"||
       option === "false") {
      if (antinuke === false) {
        message.channel.send({ content: "Antinuke is already disabled in this server." });
      } else {
        await db.delete(`antinuke_${message.guild.id}`);
        message.channel.send({ content: "Done! Antinuke is now disabled in this server." });
      }
    } else {
      message.channel.send({ embeds: [guide] })
      }
    }
  },
};