const db = require('../../core/db');

module.exports = {
  name: 'prefix',
  aliases: ['customprefix'],
  run: async (client, message, args) => {
    if (message.member.permissions.has('MANAGE_SERVER')) {

      const newPrefix = args[0];

      if (!newPrefix) {
        message.reply(`Provide me a prefix to set for this server.`);

      } else {
        if (newPrefix.length >= 5) {
          message.reply(`Please choose a smaller prefix. (Length can be below 5 characters)`)
        } else {
          await db.set(`${message.guild.id}_prefix`, newPrefix);
          message.reply(`:thumbsup: The new prefix is now set to **${newPrefix}**. Ping me if you ever forget it.`)
        }
      }
    } else {
      message.reply(`You need **Manage Server** permission to do this.`)
    }
  }
}