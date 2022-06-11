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
    let x = await db.get(`antiraid_${message.guild.id}`);
    let y;
    
    if (x) y = 'enabled'
    else y = 'disabled';
    
    const guide = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__ANTIRAID__**\n\n*This plugin, if enabled, protects your server from raid actions like anti-alts, anti-massping, anti massjoin, etc. Only admins can configure this plugin*\n\n***ACTIVATION***\n﹒to enable :: \`${prefix}antiraid enable\`\n﹒to disable :: \`${prefix}antiraid disable\`\n\n***COMMANDS***\n﹒*antimassping*\n\n***STATUS***\n﹒*Antiraid is ${y} in this server.*\n﹒*More commands are coming soon for this plugin!*`)

    const option = args[0];
    const status = await db.get(`antiraid_${message.guild.id}`);

    if (option === 'enable') {
      if (!status) {
        await db.set(`antiraid_${message.guild.id}`, true);
        message.reply(`:thumbsup: enabled this plugin.`)
      } else {
        message.reply(`Antiraid is already enabled for this server.`)
      }
    } else if (option === 'disable') {
      if (status) {
        await db.delete(`antiraid_${message.guild.id}`);
        message.reply(`:thumbsup: disabled this plugin.`)
      } else {
        message.reply(`Antiraid is already disabled for this server.`)
      }
    } else {
      message.channel.send({
        embeds: [guide]
      })
    }
  },
};


// On Message...
client.on('messageCreate', async (message) => {
  const antiRaid = await db.get(`antiraid_${message.guild.id}`);
  
  if (antiRaid) {
    if (message.mentions) {
      // Anti Mass Member Mention
      if (message.mentions.users.size >= 5) {
        message.channel.send(`${message.author}, Please do not mass mention users.`);
        message.delete();
      }

      // Anti Mass Role Mention
      if (message.mentions.roles.size >= 5) {
        message.channel.send(`${message.author}, Please do not mass mention roles.`);
        message.delete();
      }
    }
  }
});

// Anti Alt
const ms = require('ms');
client.on('guildMemberAdd', async (member) => {
  const anti = await db.get(`antiraid_${member.guild.id}`);
  if (anti) {
    let minAge = ms('7 days');
    let creD = new Date(member.user.createdAt);
    let notS = Date .now() - creD.getTime();

    if (minAge > notS) {
      member.send({
        content: `Your account's age is less than **7 days**. I had to kick you from **${member.guild.name}**`
      }).then(() => {
        setTimeout(() => {
          member.kick('alt account')
        })
      })
    }
  }
});