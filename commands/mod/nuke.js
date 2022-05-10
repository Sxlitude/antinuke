module.exports = {
  name: "nuke",
  aliases: ['n'],
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      message.reply({
        content: 'You need MANAGE_CHANNELS Permission to do this.'
      })
    } else {
      message.channel.delete();
      message.channel.clone().then((c) => { c.send(`:boom: Channel nuked by **${message.author.tag}**`)})
    }
  }
}