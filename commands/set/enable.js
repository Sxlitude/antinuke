const { Message, Client, MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "enable",
  aliases: ['e', 'antinuke enable'],
  run: async (client, message, args) => {
    var antinuke = await db.get(`antinuke_${message.guild.id}`);
    if (message.author.id !== message.guild.ownerId) {
      const guide = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription("***Antinuke :: Enable***\n*If antinuke is enabled, then only trusted admins are allowed to make changes to your server. Any unauthoarized exeutor will be banned.*\n\n﹒*Usage* :: enable *or* e\n﹒*Requires Server Ownership*")
      message.channel.send({ embeds: [guide] });
    } else {
      if (antinuke === true) {
        message.channel.send({ content: `Antinuke is already enabled for this server.` });
      } else {
        await db.set(`antinuke_${message.guild.id}`, true);
        await message.channel.send({ content: `Enabled the antinuke for this server.` });
      }
    }
  },
};