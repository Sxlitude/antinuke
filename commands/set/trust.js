const { Message, Client } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

const settings = require('../../files/settings');
const ok = settings.emojis.okay;
const que = settings.emojis.question;

module.exports = {
  name: "trust",
  aliases: ['t'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `*This command is only for the server owner.*` });
    } else {
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      if (enabled === true) {
      const user = message.mentions.users.first();
      if (!user) {
        message.channel.send({ content: `*Mention someone please.*` })
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
