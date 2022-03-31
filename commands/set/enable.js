const { Message, Client, MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "enable",
  aliases: ['e', 'antinuke enable'],
  run: async (client, message, args) => {
    var antinuke = await db.get(`antinuke_${message.guild.id}`);
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `This command is for the server's owner only.`});
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
