module.exports = {
  name: "ping",
  description: "returns the websocket ping",
  type: 'CHAT_INPUT',
  run: async (client, interaction, args) => {
    await interaction.followUp({ content: `${client.ws.ping}ms` });
  },
};