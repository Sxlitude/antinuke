const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "help",
  aliases: ['h'],
  run: async (client, message, args) => {
    
    await db.list(`trust`).then(async (keys) =>{
      // Variables
      var enabled = await db.get(`antinuke_${message.guild.id}`);
      var status;
      if (enabled != true) status = "disabled";
      if (enabled == true) status = "enabled";
      
      // Variables
      const amount = [];
      await keys.forEach(async (key) => {
        var serverAdmin = key.split(" ")[0];
        var serverAdmins = serverAdmin.split("trust")[1];
        if (serverAdmins == message.guild.id) await amount.push(serverAdmins);
      });
        // Message
        const Help = new MessageEmbed()
        .setDescription(`
**__ANTINUKE__**

*this is an antinuke bot which is made to protect your discord servers. Run any command from the commands given below to get more information.*

**__COMMANDS__**

> **Owner Commands:**
> ﹒*trust*
> ﹒*untrust*
> ﹒*list*

> **__SETTINGS__**
> ﹒antinuke :: *${status}*
> ﹒trusted admins :: *${amount.length}*
`)
        .setColor("9400d3")

        const Buttons = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL("https://dsc.gg/antiwizz"),
        new MessageButton()
        .setLabel("Support Server")
        .setStyle("LINK")
        .setURL("https://discord.gg/KMw8stwEuN")
        );
    
        await message.channel.send({ embeds: [Help], components: [Buttons] });
    });
  },
};
