const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unbanall',
  aliases: ['massunban', 'munban'],
  run: async (client, message, args) => {
    message.guild.bans.fetch().then(bans => {
      if (bans.length <= 0) {
        message.channel.send({
          content: `Since the ban count is **0**, I cannot unban members.`
        })
      } else {
        message.channel.send({
          content: `Unbanning Members...\nBan Count :: **${bans.size}**`
        }).then(msg => {
          for (x = bans.length-1; x = 0; x--) {
            message.guild.members.unban(bans[x]);
            if (x > 0) {
              msg.edit({
                content: `Unbanning Members...\nBan Count :: **${x}**`
              })
            } else {
              msg.edit({
                content: `Unbanned everyone!`
              })
            }
          }
        })
      }
    });
  }
}