const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "reset",
  aliases: ["resetlimit", "rlimit"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    let settings = await db.get(`antinuke_${message.guild.id}`);
    if (settings === null) settings = "off"
    if (settings === "on") {
      let RoleC = await db.get(`roleLimit_${message.guild.id}`);
      let RoleD = await db.get(`roledLimit_${message.guild.id}`);
      let ChannelC = await db.get(`channelLimit_${message.guild.id}`);
      let ChannelD = await db.get(`channeldLimit_${message.guild.id}`);
      let Ban = await db.get(`banLimit_${message.guild.id}`);
      let Kick = await db.get(`kickLimit_${message.guild.id}`);

      if (RoleC === null) RoleC = 3;
      if (RoleD === null) RoleD = 3;
      if (ChannelC === null) ChannelC = 3;
      if (ChannelD === null) ChannelD = 3;
      if (Ban === null) Ban = 3;
      if (Kick === null) Kick = 3;

      const help = new MessageEmbed()
        .setColor("ff8c00")
        .setDescription(`
**How to reset limits?**

*For Channels:*
﹒**,reset channelc** -> set channel create limit
﹒**,reset channeld** -> set channel delete limit

*For Roles*
﹒**,reset rolec** -> set role create limit
﹒**,reset roled** -> set role delete limit

*For Members*
﹒**,reset ban** -> set ban limit
﹒**,reset kick** -> set kick limit

*For Everything*
﹒**,reset all** -> reset every action's limit
﹒**,set all 7** -> set every limit to a number

*Tips*
﹒to *set a limit*, do **,set** for full instructions.
﹒you can disable the antinuke by doing **,disable**
      `)

      if (args[0] === "channelc") {
        await db.set(`channelLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset channel create limit to 3.")
      } else if (args[0] === "channeld") {
        await db.set(`channeldLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset channel delete limit to 3.")
      } else if (args[0] === "rolec") {
        await db.set(`roleLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset role create limit to 3.")
      } else if (args[0] === "roled") {
        await db.set(`roledLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset role delete limit to 3.")
      } else if (args[0] === "ban") {
        await db.set(`banLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset ban limit to 3.")
      } else if (args[0] === "kick") {
        await db.set(`kickLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset kick limit to 3.")
      } else if (args[0] === "all") {
        await db.set(`channelLimit_$${message.guild.id}`, 3);
        await db.set(`channeldLimit_$${message.guild.id}`, 3);
        await db.set(`roleLimit_$${message.guild.id}`, 3);
        await db.set(`roledLimit_$${message.guild.id}`, 3);
        await db.set(`banLimit_$${message.guild.id}`, 3);
        await db.set(`kickLimit_$${message.guild.id}`, 3);
        message.channel.send("i've reset every action limit to **3**.")
      } else {
        message.channel.send(help);
      }
    } else {
      message.channel.send("to run this command, enable antinuke first.")
    }
  }
};