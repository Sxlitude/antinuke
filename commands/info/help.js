const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ['h'],
  run: async (client, message, args) => {

    // Embed
    const Help = new MessageEmbed()
      .setDescription(`
**__ANTINUKE__**

*this is an antinuke bot which is made to protect your discord servers. Run any command from the commands given below to get more information.*

**__COMMANDS__**

> **Owner Commands:**
> ﹒*trust*
> ﹒*untrust*
> ﹒*list*
`)
      .setColor("9400d3")

    const Buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL("https://dsc.gg/antiwizz")
    );
    
    message.channel.send({ embeds: [Help], components: [Buttons] })
    console.log(message.guild.channels.cache.size)
  },
};