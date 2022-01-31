const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: "view",
  aliases: ["viewlimits", "view", "check", "checklimits"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const guild = message.guild.id
    const user = message.mentions.members.first()
    if (!user) {
      message.channel.send("mention someone to see what they did in the last hour.")
    } else {
      let RoleC = await db.get(`roleLimit_${user.id}-${guild}`);
      let RoleD = await db.get(`roledLimit_${user.id}-${guild}`);
      let ChannelC = await db.get(`channelLimit_${user.id}-${guild}`);
      let ChannelD = await db.get(`channeldLimit_${user.id}-${guild}`);
      let Ban = await db.get(`banLimit_${user.id}-${guild}`);
      let Kick = await db.get(`kickLimit_${user.id}-${guild}`);

      if (RoleC === null) RoleC = 0;
      if (RoleD === null) RoleD = 0;
      if (ChannelC === null) ChannelC = 0;
      if (ChannelD === null) ChannelD = 0;
      if (Ban === null) Ban = 0;
      if (Kick === null) Kick = 0;

      let Statistics = new MessageEmbed()
        .setDescription(`**${user.user.username} Did These Actions in the last hour**

        ﹒Channels Created: **${ChannelC}**
        ﹒Channels Deleted: **${ChannelD}**

        ﹒Roles Created: **${RoleC}**
        ﹒Roles Deleted: **${RoleD}**

        ﹒Members Banned: **${Ban}**
        ﹒Members Kicked: **${Kick}**
        `)
      message.channel.send(Statistics);
    }
  }
};