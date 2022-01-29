module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
       message.channel.send(`🏓 Pong - ${client.ws.ping}ms`)
    }
}
