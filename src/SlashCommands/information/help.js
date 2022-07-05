const { MessageEmbed } = require('discord.js');
const Settings = require('../../core/settings.js');
const db = require('../../core/db.js');

const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'shows the help embeds',
  type: 'CHAT_INPUT',
  run: async (client, message, args) => {
    await message.channel.send(`<@${message.user.id}> uSeD /heLp! \nunder constrution\nowner's message: 🖕`)
    /*
    let prefix = await db.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = Settings.bot.info.prefix;
    
    const helpEmbed = embeds('help');
    const menuOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpOption')
        .setPlaceholder('Choose something...')
        .addOptions([
          {
            label: 'Whitelisting Guide',
            value: 'antinukeCmds',
            description: 'Check out how to use antinuke module'
          },
          {
            label: 'Moderation Commands',
            value: 'modCmds',
            description: 'Some basic moderation commands'
          },
        ])
    )

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Invite Me')
        .setStyle('LINK')
        .setURL('https://dsc.gg/antiwizz'),
      new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setURL(`${Settings.bot.credits.supportServer}`)
    )

    await message.channel.send({
      embeds: [helpEmbed],
      components: [menuOptions, buttons]
    });

    const filter = (i) => i.isSelectMenu();
    const collector = message.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async (i) => {
      if (i.user.id !== message.user.id) {
        await i.reply({
          content: 'this menu is not for you.',
          ephemeral: true,
        })
      } else {
        await i.deferUpdate();
        const value = i.values[0];

        if (value === 'antinukeCmds') {
          i.editReply({
            embeds: [embeds('y', prefix)],
          })
        } else if (value === 'modCmds') {
          await i.editReply({
            embeds: [embeds('x')],
          })
        }
      }
    })
    */
  }
}

function embeds(embed, prefix) {
  if (embed === 'help') {
    return new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`***ANTINUKE ***\n
This antinuke bot has many features & all of them are free. This bot only allows whitelisted admins to do actions in your server. For more info about this bot, use the menu given below this message.


***PROTECTION FEATURES***
﹒anti webhook (create, edit, delete)
﹒anti channel (create, edit, delete)
﹒anti emoji (create, edit, delete)
﹒anti role (create, edit, delete)
﹒anti member (ban, edit, kick)
﹒anti community spam
﹒anti vanity url snipe
﹒anti mass mention
﹒anti alt accounts`);
    
  } else if (embed === 'x') {
    return new MessageEmbed()
      .setColor("PURPLE")
      .setDescription("**__MODERATION__**\n\n*This plugin always stays enabled. If you have required permissions, then you can run moderation commands which are listed below.*\n\n***COMMANDS***\n﹒*ban*\n﹒*kick*\n﹒*nickname*\n﹒*timeout*\n﹒*snipe*\n﹒*editsnipe*\n﹒*unban*\n﹒*nuke*\n\n***USAGES***\n﹒*ban @user*\n﹒*kick @user*\n﹒*nick @user*\n﹒*timeout @user*\n﹒*unban @user*\n﹒*nuke*\n*﹒*snipe*\n﹒*editsnipe*")
  } else if (embed === 'y') {
    return new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`_**Antinuke Toggling**_

**Commands:**
﹒To enable antinuke: *${prefix}antinuke enable*
﹒To disable antinuke: *${prefix}antinuke disable*

**If enabled, the bot will:**
﹒ban executor of unauthorized actions
﹒ignore whitelisted admins' actions
﹒recover unauthorized actions

---

_**Whitelisting Guide**_

**Commands:**
﹒To whitelist a user: *${prefix}whitelist @user*
﹒To unwhitelist a user: *${prefix}unwhitelist @user*
﹒To see all whitelisted users: *${prefix}whitelisted*

**Whitelisted Admins:**
﹒will be ignored by the antinuke
﹒cannot whitelist other admins


*want help or wanna ask some questions about the bot? or if you want to suggest something, feel free to join the [support server](${Settings.bot.credits.supportServer})*`);
  }
};