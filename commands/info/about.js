const { Message, Client, MessageEmbed } = require("discord.js");
const { Embeds, Links, InteractionEmbeds } = require('../../files/embeds.js');

const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "about",
  aliases: ['a'],
  run: async (client, message, args) => {
    const embed = InteractionEmbeds.Information(client.ws.ping, client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c), client.guilds.cache.size)
    message.channel.send({ embeds: [embed] });
  },
};