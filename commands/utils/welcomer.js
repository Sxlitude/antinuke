const { Message, Client, MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "welcomechannel",
  aliases: ['channel', 'welcchannel'],
  run: async (client, message, args) => {
    const guide = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription("***Welcome Channel Command***\n*I'll welcome new members once they join this server. Mention a channel to set it for new members.*\n\n﹒*Usage* :: channel #channel\n﹒*Requires Admin Permissions*")
    
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.channel.send({ embeds: [guide] });
    } else {
      const channel = message.mentions.channels.first();
      if (!channel) {
        message.channel.send({ embeds: [guide] });
      } else {
        const success = new MessageEmbed()
          .setColor("PURPLE")
          .setDescription(`***Success***\n﹒*Channel* :: ${channel}`)
        await db.set(`welcomer_${message.guild.id}`, channel.id);
        message.channel.send({ embeds: [success] });
      }
    }
  },
};