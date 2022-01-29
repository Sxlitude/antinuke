module.exports = {
  name: "ping",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    message.channel.send(client.ws.ping)
  }
};