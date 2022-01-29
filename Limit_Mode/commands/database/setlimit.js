const { MessageEmbed } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "set",
  aliases: ["limit"],
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
**How to set limits?**

*For Channels:*
﹒**,set channelc 4** -> set channel create limit
﹒**,set channeld 4** -> set channel delete limit

*For Roles*
﹒**,set rolec 2** -> set role create limit
﹒**,set roled 2** -> set role delete limit

*For Members*
﹒**,set ban 6** -> set ban limit
﹒**,set kick 6** -> set kick limit

*For Everything*
﹒**,set all 6** -> set every action's limit
﹒**,reset all** -> reset every limit to 3

*Tips*
﹒to *reset a limit*, do **,reset** for full instructions.
﹒you can disable the antinuke by doing **,disable**
      `)
      // ----------[ Channel Create Limit ]---------- \\
      if (!args[0]) {
        message.channel.send(help)
      } else if (args[0] === "channelc") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`channelLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set channel create limit to **${args[0]}**.`)
        }
        // ----------[ Channel Delete Limit ]---------- \\

      } else if (args[0] === "channeld") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`channeldLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set channel delete limit to **${args[0]}**.`)
        }
        // ----------[ Role Delete Limit ]---------- \\
      } else if (args[0] === "roled") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`roledLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set role delete limit to **${args[0]}**.`)
        }
        // ----------[ Role Create Limit ]---------- \\
      } else if (args[0] === "rolec") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`roleLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set role create limit to **${args[0]}**.`)
        }
        // ----------[ Member Ban Limit ]---------- \\
      } else if (args[0] === "ban" || args[0] === "bans") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`banLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set role create limit to **${args[0]}**.`)
        }
        // ----------[ Member Kick Limit ]---------- \\
      } else if (args[0] === "kick") {
        if (isNaN(args[1])) { message.channel.send("provide a number to set limits.") };
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          await db.set(`kickLimit_${message.guild.id}`, args[1])
          message.channel.send(`sucessfully set role create limit to **${args[0]}**.`)
        }
      } else if (args[0] === "all") {
        if (isNaN(!args[1])) { message.channel.send("provide a number to set limits.") }
        if (args[1] >= 11 || args[1] < 3) {
          message.channel.send("minimum set limit is **3**\nmaximum set limit is **10**.")
        } else {
          try {
            await db.set(`kickLimit_$${message.guild.id}`, args[1]);
            await db.set(`banLimit_$${message.guild.id}`, args[1]);
            await db.set(`channelLimit_$${message.guild.id}`, args[1]);
            await db.set(`channeldLimit_$${message.guild.id}`, args[1]);
            await db.set(`roleLimit_$${message.guild.id}`, args[1]);
            await db.set(`roledLimit_$${message.guild.id}`, args[1]);
          } catch (e) {
            console.log('failed')
          }
          message.channel.send("i've set every action' limit to " + args[1]);
        }
      } else {
        message.channel.send(help)
      }
    } else {
      message.channel.send("to run this command, enable antinuke first.")
    }
  }
};