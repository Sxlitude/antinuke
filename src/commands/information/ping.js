module.exports = {
  name: 'ping',
  aliases: ['p'],
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping}ms`)
  }
}