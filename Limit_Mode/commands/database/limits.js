const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "limits",
  aliases: ["showlimits"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {

    // Variables
    let RoleC = await db.get(`roleLimit_${message.guild.id}`);
    let RoleD = await db.get(`roledLimit_${message.guild.id}`);
    let ChannelC = await db.get(`channelLimit_${message.guild.id}`);
    let ChannelD = await db.get(`channeldLimit_${message.guild.id}`);
    let Ban = await db.get(`banLimit_${message.guild.id}`);
    let Kick = await db.get(`kickLimit_${message.guild.id}`);

    // If it's Null...
    if (RoleC === null) RoleC = 3;
    if (RoleD === null) RoleD = 3;
    if (ChannelC === null) ChannelC = 3;
    if (ChannelD === null) ChannelD = 3;
    if (Ban === null) Ban = 3;
    if (Kick === null) Kick = 3;

    // Stats
    let Limits = new MessageEmbed()
    .setColor("7f00ff")
      .setDescription(`**Limits For ${message.guild.name}**

﹒Channel Create Limit: **${ChannelC}**
﹒Channel Delete Limit: **${ChannelD}**

﹒Role Create Limit: **${RoleC}**
﹒Role Delete Limit: **${RoleD}**

﹒Member Kick Limit: **${Kick}**
﹒Member Ban Limit: **${Ban}**`)
    let settings = await db.get(`antinuke_${message.guild.id}`);
    if (settings === null) settings = "off"
    if (settings === "on") {
      message.channel.send(Limits)
    } else {
      message.channel.send("to run this command, enable antinuke first.")
    }
  }
};