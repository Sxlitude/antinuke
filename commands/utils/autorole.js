const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "autorole",
  aliases: ["ar"],
  run: async (client, message, args) => {
    const role = message.mentions.roles.first();
    const guide = new MessageEmbed()
          .setColor("PURPLE")
          .setDescription(`***Autorole Command***
*I'll give a role to new members once they join this server. Mention a role to set it for new members.*

﹒*Usage* :: autorole @role
﹒*Requires Admin Permissions*`)
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      if (!role) {
        message.channel.send({ embeds: [guide] });
      } else {
        message.channel.send({ content: `You're missing administrator permissions to run this command,` });
      }
    } else {
      if (!role) {
        message.channel.send({ embeds: [guide] });
      } else {
        if (role.permissions.has("ADMINISTRATOR")) {
          message.channel.send({ content: "You cannot select a role which has admin permissios." });
        } else if (role.permissions.has("KICK_MEMBERS") ||
                  role.permissions.has("BAN_MEMBERS")) {
          message.channel.send({ content: "You cannot select a role which has permissin to manage members (kick, ban, manage, etc.)" });
        } else {
          const done = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`***Success***\n﹒*Role* :: ${role}`)
          await db.set(`autoRole_${message.guild.id}`, role.id);
          message.channel.send({ embeds: [done] });
        }
      }
    }
  },
};