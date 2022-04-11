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
  name: "help",
  aliases: ['h'],
  run: async (client, message, args) => {
    const options = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("home")
        .setPlaceholder("Select an option")
        .addOptions([
          {
            label: "Home Page",
            value: "home",
            description: "The introduction page"
          },
          {
            label: "Commands Page",
            value: "commands",
            description: "The commands page"
          },
          {
            label: "About Page",
            value: "about",
            description: "The about page"
          },
        ])
    );
    
    await db.list(`trust`).then(async (keys) =>{
      // Antinuke Status
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      var status;
      if (enabled != true) status = "disabled";
      if (enabled == true) status = "enabled";
      
      // Amount of Trusted Admins
      const amount = [];
      await keys.forEach(async (key) => {
        var serverAdmin = key.split(" ")[0];
        var serverAdmins = serverAdmin.split("trust")[1];
        if (serverAdmins == message.guild.id) await amount.push(serverAdmins);
      });

      const servers = client.guilds.cache.size;
      const users = client.guilds.cache.map((guild) => guild.memberCount).reduce((x, y) => x + y);
      
    // Message Embeds
    const embed1 = new MessageEmbed()
      .setColor("7289da")
      .setDescription(`***About Antinuke***\n*This bot is made to protect your servers from nukes. It is an easy-to-setup bot. No need of a big brain to learn how to use this antinuke. You can learn everything about this antinuke and how to use it in this message.*\n\n***Help & Support***\n﹒*Join the* *__[Discord Server](https://discord.gg/KMw8stwEuN)__* *to get help.*\n﹒*Want to* *__[Contribute?](https://github.com/sxlitude/antinuke)__* *You're most welcome!*`)
    const embed2 = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__COMMANDS__**\n\nHere is a list of commands you can probably use. Since it's a security bot, Maximum commands are for Owner / Admin only.\n\n***Antinuke***\n> ﹒enable\n> ﹒disable\n> ﹒trust\n> ﹒untrust\n> ﹒list\n\n***Moderation***\n> ﹒ban\n> ﹒kick\n> ﹒nick\n\n***Utility***\n> ﹒autorole\n> ﹒welcomer\n\n***Information***\n> ﹒help\n> ﹒about\n> ﹒ping\n_ _`)
    const embed3 = new MessageEmbed()
      .setColor("7289da")
      .setDescription(`***Server Settings Overview***\n﹒*Antinuke Status* :: ${status}\n﹒*Trusted Admins* :: ${amount.length}\n\n***Bot's Statistics Overview***\n﹒*Total Servers* :: ${servers}\n﹒*Total Users* :: ${users}\n﹒*Bot Ping* :: ${client.ws.ping}ms\n\n***Bot's Credits Overview***\n﹒*Coded by* :: Sxlitude#8885\n﹒*GitHub* :: [Click Here](https://github.com/sxlitude/antinuke)\n﹒*Discord Server* :: [Click to Join]()`)

    // Sending
    message.channel.send({ embeds: [embed2]});
    });
  },
};