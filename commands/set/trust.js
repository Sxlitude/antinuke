const { Message, MessageEmbed, Client } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

const settings = require('../../files/settings');

module.exports = {
  name: "trust",
  aliases: ['t', 'wl', 'whitelist'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `*This command is only for the server owner.*` });
    } else {
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      if (enabled === true) {
      const user = message.mentions.users.first();
      if (!user) {
        const guide = new MessageEmbed()
          .setColor("PURPLE")
          .setDescription("***Trust Command***\n*If your admins are trusted, i will ignore whatever they do in your server. They won't get punished for doing actions.*\n\n﹒*Usage* :: trust @user\n﹒*Requires Server Ownership*")
        message.channel.send({ embeds: [guide] })
      } else {
        const ID = user.id;
        const Guild = message.guildId;
        let whitelisted = await db.get(`trust${Guild} ${ID}`)
        if (whitelisted === null) whitelisted = false;
      
        if (whitelisted === true) {
          message.channel.send({ content: `*They're already trusted.*` });
        } else {
          await db.set(`trust${Guild} ${ID}`, true)
          await message.channel.send({ content: `**${user.username}** was added to the trusted admins' list.` })
        }
      }
     } else {
        message.channel.send({ content: `To run this command, enable antinuke first.`});
     }
    }
  },
}