const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require('../../index');
const db = require('../../core/db');

const { onServerJoin } = require('../../core/settings');



/* Just for Promotion xD */
const desc = `🛡️ __**This Server is Protected by Terror Antinuke**__

***Overview***
﹒*This bot has a fast speed*
﹒*Over 100k users are protected*
﹒*It is tested on blazing fast nukers*
﹒*It is an easy to use security bot*

***Features***
﹒*It protects from 17 unauthorised events*
﹒*It can bring back all channels if they're nuked*
﹒*it will delete unauthorised created channels*
﹒*it will delete unauthorised created roles*
﹒*It can recover deleted roles too*

***Interested?***
﹒*Click the button to invite me!*
﹒*Make sure to enable the antinuke*
﹒*Do* **\`;antinuke\`** *in a server for info*
﹒*My prefix is ;*

***Have questions?***
﹒*Join the support server if you wanna ask something*
﹒*This bot is an open sourced antinuke tool*

***One thing to note***
﹒*Your server should have 5+ members*`;

client.on("guildMemberAdd", async (member) => {
  const btn = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel('Invite Me')
      .setStyle('LINK')
      .setURL('https://dsc.gg/antiwizz'),
    new MessageButton()
    .setLabel('Support Server')
    .setStyle('LINK')   
    .setURL('https://discord.gg/KMw8stwEuN')                                         
  );
  /*
  member.send({
    content: `${desc}`,
    components: [btn]
  }).then((m) => {
    setTimeout(() => {
      m.delete()
    }, 600000)
  })
*/

  // AutoRole
  const roleID = await db.get(`autoRole_${member.guild.id}`);
  if (roleID !== null) {
    const role = member.guild.roles.cache.find(role => role.id == roleID);
    if (role) {
      await member.roles.add(role);
    }
  }

  // Welcomer
  const channelID = await db.get(`welcomer_${member.guild.id}`);
  if (channelID !== null) {
    const channel = member.guild.channels.cache.find(channel => channel.id == channelID);
    if (channel) {
      const memberCount = member.guild.members.cache.size;
      const position = ordialSuffix(`${memberCount}`);
      const welcomeMsg = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`***Welcome to the server***\n﹒*You're the **${position}** member here.*\n﹒*enjoy your stay in **${member.guild.name}**.*`)
      channel.send({
        content: `<@${member.id}>`,
        embeds: [welcomeMsg]
      })
    }
  }
});

function ordialSuffix (i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}