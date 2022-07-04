const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const Settings = require('../../core/settings.js');
const client = require('../../index');
const db = require('../../core/db');

module.exports = {
  name: 'help',
  aliases: ['h'],
  run: async (client, message, args) => {
    let prefix = await db.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = Settings.bot.info.prefix;
    
    const helpEmbed = embeds('help');
    const menuOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpOption')
        .setPlaceholder('Choose something...')
        .addOptions([
          {
            label: 'Antinuke Toggle Commands',
            value: 'toggleCmds',
            description: 'Commands to enable/disable antinuke'
          },
          {
            label: 'Antinuke Whitelist Commands',
            value: 'wlCmds',
            description: 'The whitelisting guide'
          },
          {
            label: 'Antinuke DM Notifications',
            value: 'dmNotifs',
            description: 'Guide to set a DM Logger'
          },
          {
            label: 'Moderation Commands',
            value: 'modCmds',
            description: 'Some basic moderation commands'
          },
          {
            label: 'Antinuke Credits',
            value: 'credits',
            description: 'who created this bot?'
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

    message.channel.send({
      embeds: [helpEmbed],
      components: [menuOptions, buttons]
    });

    const filter = (i) => i.isSelectMenu();
    const collector = message.channel.createMessageComponentCollector({ filter, limit: 10 });

    collector.on('collect', async (i) => {
      if (i.user.id !== message.author.id) {
        await i.reply({
          content: 'this menu is not for you.',
          ephemeral: true,
        })
      } else {
        await i.deferUpdate();
        const value = i.values[0];

        if (value === 'toggleCmds') {
          await i.editReply({
            embeds: [embeds('toggle', prefix)],
          })
          
        } else if (value === 'wlCmds') {
          await i.editReply({
            embeds: [embeds('whitelist', prefix)]
          })
          
        } else if (value === 'dmNotifs') {
          await i.editReply({
            embeds: [embeds('logger', prefix)]
          })
          
        } else if (value === 'modCmds') {
          await i.editReply({
            embeds: [embeds('x')],
          })
        } else if (value === 'credits') {
          await i.editReply({
            embeds: [new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`This discord bot is an open-source project. You an star my GitHub repo if you love my work. 

**CREDITS**
﹒This bot is coded by Sxlitude#8885
﹒[Click Here](https://discord.gg/KMw8stwEuN) for official server of this bot.
﹒To invite this bot, [click me](https://dsc.gg/antiwizz)!

**BOT INFO**
﹒Owner :: Sxlitude
﹒Library :: discord.js
﹒Latency :: ${client.ws.ping}ms`)]
          })
        }
      }
    })
  }
}

function embeds(embed, prefix, ping) {
  if (embed === 'help') {
    return new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`***ANTINUKE*** \n
This antinuke bot has many features & all of them are free. This bot only allows whitelisted admins to do actions in your server. For more info about this bot, use the menu given below this message.


***PROTECTION FEATURES***
﹒anti webhook (create, edit, delete)
﹒anti channel (create, edit, delete)
﹒anti emoji (create, edit, delete)
﹒anti role (create, edit, delete)
﹒anti member (ban, edit, kick)
﹒anti community spam
﹒anti vanity url snipe

***LINKS***
﹒If you love my work, make sure to [star my repo](https://github.com/sxlitude/antinuke)
﹒Join the [support server](${Settings.bot.credits.supportServer}) if you need help`);
    
  } else if (embed === 'x') {
    return new MessageEmbed()
      .setColor("PURPLE")
      .setDescription("**__MODERATION__**\n\nHere are some simple moderation-related commands. If you have required permissions, you can use them.\n\n***COMMANDS***\n﹒*ban*\n﹒*kick*\n﹒*nickname*\n﹒*timeout*\n﹒*unban*\n﹒*nuke*\n\n***USAGES***\n﹒*ban @user*\n﹒*kick @user*\n﹒*nick @user*\n﹒*timeout @user*\n﹒*unban @user*\n﹒*nuke*")
  } else if (embed === 'toggle') {
    return new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`_**Antinuke Toggling**_\n
If you enable antinuke, or already did it, make sure to whitelist your server admins & bots so they won't get banned for doing actions.

**Commands:**
﹒To enable antinuke: *${prefix}antinuke enable*
﹒To disable antinuke: *${prefix}antinuke disable*

**If enabled, the bot will:**
﹒ban executor of unauthorized actions
﹒ignore whitelisted admins' actions
﹒recover unauthorized actions`);

  } else if (embed === 'whitelist') {
    return new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`_**Whitelisting Guide**_\n
The whitelist commands can only be used if the antinuke is enabled in the server. All the antinuke commands can be ran by the server owner.

**Commands:**
﹒To whitelist a user: *${prefix}whitelist @user*
﹒To unwhitelist a user: *${prefix}unwhitelist @user*
﹒To see all whitelisted users: *${prefix}whitelisted*

**Whitelisted Admins:**
﹒will be ignored by the antinuke
﹒cannot whitelist other admins`);

    
  } else if (embed === 'logger') {
    return new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`_**DM Logging**_\n
The logs are sent privately to the server owner. The bot fires logs when it bans someone who was not whitelisted & did an action in your server.

**Commands**
﹒To enable DM Logging: *${prefix}dmlogs enable*
﹒To disable DM Logging: *${prefix}dmlogs disable*

**If Logging is Enabled:**
﹒info of unauthorized actions will be sent in dms.
﹒this info will be sent to the server owner only.`);
  }
};
