const { MessageEmbed } = require("discord.js");
const client = require('../../index');
const Database = require("@replit/database");
const db = new Database();

client.on("guildMemberAdd", async (member) => {
  // AutoRole
  const roleID = await db.get(`autoRole_${member.guild.id}`);
  if (roleID !== null) {
    const role = member.guild.roles.cache.find(role => role.id == roleID);
    if (role) {
      await member.roles.add(role);
    }
  }

  // Welcomer
  const channelID = await db.get(`welcomer_${member.guild.id}`);
  if (channelID !== null) {
    const channel = member.guild.channels.cache.find(channel => channel.id == channelID);
    if (channel) {
      const memberCount = member.guild.members.cache.size;
      const position = ordialSuffix(`${memberCount}`);
      const welcomeMsg = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`***Welcome to the server***\n﹒*You're the **${position}** member here.*\n﹒*enjoy your stay in **${member.guild.name}**.*`)
      channel.send({
        content: `<@${member.id}>`,
        embeds: [welcomeMsg]
      })
    }
  }
});

function ordialSuffix (i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}