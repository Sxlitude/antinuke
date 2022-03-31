const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Embeds, Links, InteractionEmbeds } = require('../../files/embeds.js');

const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "about",
  aliases: ['a'],
  run: async (client, message, args) => {
    const Buttons = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel("GitHub Repo")
        .setStyle("LINK")
        .setURL("https://github.com/sxlitude/antinuke")
        );
    const embed = InteractionEmbeds.Information(client.ws.ping, client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c), client.guilds.cache.size)
    message.channel.send({ embeds: [embed], components: [Buttons] });
  },
};
