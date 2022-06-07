const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unbanall',
  aliases: ['massunban', 'munban'],
  run: async (client, message, args) => {
    if (message.member.permissions.has('BAN_MEMBERS')) {
      message.channel.send("unbanning...")
      await message.guild.bans.fetch().then((bans) => {
        bans.forEach(ban => {
          message.guild.members.unban(ban.user.id)
        })
      })
    }
  }
}