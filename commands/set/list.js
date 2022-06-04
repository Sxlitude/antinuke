const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require('../../core/db');
const client = require("../../index");

module.exports = {
  name: "list",
  aliases: ['l', 'trusted', 'whitelisted'],
  run: async (client, message, args) => {

    // Check if the author is server owner
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `only the owner can check the list` });
      
    } else {
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      if (enabled === true) {
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
            .setColor("PURPLE")

          const btn = new MessageActionRow().addComponents(
            new MessageButton()
             .setLabel("Clear")
             .setStyle("DANGER")
             .setCustomId('clear')                                                                  
          )
          message.channel.send({
            embeds: [trustedUsers] ,
            components: [btn]
          })
        } else {
          message.channel.send({ content: 'there are no trusted users.' })
        }
      });
      } else {
        message.channel.send({ content: `To run this command, enable antinuke first.`});
      }
    }
  },
}


// Interaction
client.on("interactionCreate", async (i) => {
  if (i.isButton()) {
    if (i.customId === 'clear') {
      if (i.user.id !== i.guild.ownerId) {
        i.reply({
          content: 'Only the server owner is allowed to do this.',
          ephemeral: true
        })
      } else {
        const b = new MessageActionRow().addComponents(
          new MessageButton()
          .setCustomId('yes')
          .setLabel('Yes')
          .setStyle('SUCCESS'),
          new MessageButton()
          .setCustomId('no')
          .setLabel('No')
          .setStyle('DANGER')
        )
        i.reply({
          content: 'Are you sure that you wanna clear this list?',
          components: [b],
          ephemeral: true                       
        })
      }
    }
    if (i.customId === 'yes') {
      if (i.user.id !== i.guild.ownerId) {
        i.reply({
          content: `${i.user.username}, you aren't allowed to do this.`,
          ephemeral: true
        })
      } else {
        await db.list(`trust${i.guild.id}`).then(async (keys) => {
          keys.forEach(async (key) => {
            await db.delete(`${key}`);
          });
          await i.reply({
            content: "Cleared the list :thumbsup:",
            ephemeral: true
          })
        }) 
      }
    } else if (i.customId === 'no') {
      if (i.user.id !== i.guild.ownerId) {
        i.reply({
          content: 'Only the server owner is allowed to do this.',
          ephemeral: true
        })
      } else {
        i.reply({
          content: 'Process Cancelled.',
          ephemeral: true,
        })
      }
    }
  }
})