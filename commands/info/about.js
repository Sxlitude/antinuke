// Button Pagination and Discord.js
const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const client = require("../../index");

// Database
const Database = require("@replit/database");
const db = new Database();

// Settings
const Settings = require('../../files/settings.js');
const prefix = Settings.bot.prefix;

// Command
module.exports = {
  name: "about",
  aliases: ['a'],
  run: async (client, message, args) => {
    await db.list(`trust`).then(async (keys) => {
      
      // Amount of Trusted Admins
      const amount = [];
      await keys.forEach(async (key) => {
        var serverAdmin = key.split(" ")[0];
        var serverAdmins = serverAdmin.split("trust")[1];
        if (serverAdmins == message.guild.id) await amount.push(serverAdmins);
      });
      
      // Antinuke Status
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      var status;
      if (enabled != true) status = "disabled";
      if (enabled == true) status = "enabled";

      // Trusted Admins
      var admins = amount.length;
      var count;
      if (admins === 0) count = "none";

      // Welcome Channel
      var welcomer = await db.get(`welcomer_${message.guild.id}`);
      var channel;
      if (welcomer === null) channel = "none";
      if (welcomer !== null) channel = "<#" + welcomer +">";

      // Welcome Role
      var autorole = await db.get(`autoRole_${message.guild.id}`);
      var role;
      if (autorole === null) role = "none";
      if (autorole !== null) role = "<@" + autorole +">";
      
      const servers = client.guilds.cache.size;
      const users = client.guilds.cache.map((guild) => guild.memberCount).reduce((x, y) => x + y);
    const embed3 = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`***Server Settings Overview***\n﹒*Antinuke Status* :: ${status}\n﹒*Trusted Admins* :: ${count}\n﹒*Welcome Channel* :: ${channel}\n﹒*Welcome Role* :: ${role}\n\n***Bot's Statistics Overview***\n﹒*Total Servers* :: ${servers}\n﹒*Total Users* :: ${users}\n﹒*Bot Ping* :: ${client.ws.ping}ms\n\n***Bot's Credits Overview***\n﹒*Coded by* :: Sxlitude#8885\n﹒*GitHub* :: [Click Here](https://github.com/sxlitude/antinuke)\n﹒*Discord Server* :: [Click to Join]()`)

    // Sending
    message.channel.send({ embeds: [embed3]});
    });
  },
};