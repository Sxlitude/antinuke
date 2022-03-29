const { Message, Client, MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "list",
  aliases: ['l', 'trusted', 'whitelisted'],
  run: async (client, message, args) => {

    // Check if the author is server owner
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `only the owner can check the list` });
      
    } else {
      const users = [];
      const Guild = message.guildId;

      // Get all trusted users from a guild
      await db.list(`trust${message.guild.id} `).then(async array => {

        if (array.length > 0) {
          
          // For in loop
          for (x in array) {
          const mentions = array[x];
          const split = mentions.split(" ")[1];
          const IDs = "<@" + split + ">";
          await users.push(IDs);
            
          }
          
          // Sending the list, finally!
          const trustedUsers = new MessageEmbed()
            .setTitle('trusted users')
            .setDescription(`${users.join("\n")}`)
            .setColor("6a5acd")
          message.channel.send({ embeds: [trustedUsers] })
        } else {
          message.channel.send({ content: 'there are no trusted users.' })
        }
      });
    }
  },
}