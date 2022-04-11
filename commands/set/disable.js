const { Message, Client, MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "disable",
  aliases: ['d', 'antinuke disable'],
  run: async (client, message, args) => {
    var antinuke = await db.get(`antinuke_${message.guild.id}`);
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `This command is for the server's owner only.`});
    } else {
      if (antinuke === false) {
        message.channel.send({ content: `Antinuke is already disabled for this server.` });
      } else {
        await db.set(`antinuke_${message.guild.id}`, false);
        await message.channel.send({ content: `Disabled the antinuke for this server.` });
      }
    }
  },
};