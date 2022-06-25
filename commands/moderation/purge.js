module.exports = {
  name: 'purge',
  aliases: ['clear', 'c'],
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      message.reply(`:warning: You do not have permission to **manage messages**`)
    } else {
      const amount = args[0];
      if (!amount) {
        message.reply(':warning: please provide an amount of messages to clear')
      } else {
        if (!parseInt(amount)) {
          message.reply('Provide me the amount in number to clear messages')
        } else if (amount >= 101) {
          message.reply(':warning: Provide a number below __100__.')
        } else {
          await message.channel.messages.fetch({ limit: parseInt(amount) }).then(msgs => {
            msgs.forEach(msg => {
              msg.delete();
            })
          })
          message.channel.send(`Deleted __${amount}__ Messages...`)
        }
      }
    }
  }
}