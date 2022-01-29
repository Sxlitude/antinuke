const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "forgive",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {

    let settings = await db.get(`antinuke_${message.guild.id}`);
    const guild = message.guild.id;
    const user = message.mentions.members.first();
    if (message.author.id === message.guild.ownerID) {
      if (settings === "on") {
        if (user) {
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

          if (RoleC !== 0) {
            await db.set(`roleLimit_${user.id}-${guild}`, 0);
          }
          if (RoleD !== 0) {
            await db.set(`roledLimit_${user.id}-${guild}`, 0);
          }
          if (ChannelC !== 0) {
            await db.set(`channelLimit_${user.id}-${guild}`, 0);
          }
          if (ChannelD !== 0) {
            await db.set(`channeldLimit_${user.id}-${guild}`, 0);
          }
          if (Kick !== 0) {
            await db.set(`kickLimit_${user.id}-${guild}`, 0);
          }
          if (Ban !== 0) {
            await db.set(`banLimit_${user.id}-${guild}`, 0);
          }

          await message.channel.send(`i've forgiven all the actions done by **${user.name}** in the previous hour.`)
        } else {
          message.channel.send("to forgive someone, mention them")
        }
      } else {
        message.channel.send("please enable antinuke for this server to run this command.")
      }
    } else {
      message.channel.send("you're not the owner to run this command.")
    }
  }
};