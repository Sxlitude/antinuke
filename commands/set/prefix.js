const db = require('../../core/db');

module.exports = {
  name: 'prefix',
  aliases: ['customprefix'],
  run: async (client, message, args) => {
    if (message.member.permissions.has("ADMINISTRATOR") ||
    message.member.permissions.has("MANAGE_SERVER")) {
      const newPrefix = args[0]
      if (!newPrefix) {
        message.reply(`Provide me a prefix to set for this server.`);
      } else if (newPrefix === '$$$$') {
        message.reply('You cannot set the new prefix to **$$$$**')
      } else {
        if (args[0].length >= 5) {
          message.reply(`Please choose a smaller prefix. (Length can be below 5 characters)`)
        } else {
      await db.set(`pre_${message.guild.id}`, args[0]);
        message.reply(`:thumbsup: The new prefix is now set to **${args[0]}**. Ping me if you ever forget it.`)
        }
      }
    } else {
      message.reply(`You need **Administrator** or **Manage Members** permission to do this.`)
    }
  }
}