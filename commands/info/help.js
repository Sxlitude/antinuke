const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const Settings = require('../../core/settings.js');
const client = require('../../index');
const db = require('../../core/db');

module.exports = {
  name: 'help',
  aliases: ['h'],
  run: async (client, message, args) => {
    const helpEmbed = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`***__Terror Antinuke__***\n\n*This is a great antinuke bot which provides features like* **recovery**, **anti vanity steal**, *etc. for completely free!*\n\n***Overview***\n﹒*Over 200k users are protected*\n﹒*Tested on superfast nukers*\n\n***Features***\n﹒*It protects from 19 types of actions*\n﹒*It has recovery feature for free of cost*\n\n***Tips***\n﹒*Click an option to get more help on that topic*\n﹒*If you need help you can join the support server*`);
    const menuOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpOption')
        .setPlaceholder('Choose something...')
        .addOptions([
          {
            label: 'Anti Nuke Commands',
            value: 'one',
            description: 'Check out how to use antinuke module'
          },
          {
            label: 'Anti Nuke Features',
            value: 'two',
            description: 'The features the bot currently has'
          },
          {
            label: 'Anti Raid Commands',
            value: 'antiraid',
            description: 'Some simple moderation commands'
          },
          {
            label: 'Moderation Commands',
            value: 'three',
            description: 'Some simple moderation commands'
          },
          {
            label: 'Information Commands',
            value: 'four',
            description: 'Some other commands... maybe useful?'
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
        .setURL(`${Settings.credits.supportServer}`)
    )

    message.channel.send({
      embeds: [helpEmbed],
      components: [menuOptions, buttons]
    });

    const prefix = Settings.bot.prefix;
    let status = 'disabled';
    let an = await db.get(`antinuke_${message.guild.id}`);
    if (an) status = 'enabled';

    const antinukeCmds = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__ANTINUKE__**\n\n*This plugin, if enabled, sets strict restrictions on performing actions in your server. Only admin you trust can do actions on your server. Run any command to get deeper knowledge of it.*\n\n***ACTIVATION***\n﹒to enable :: \`${prefix}antinuke enable\`\n﹒to disable :: \`${prefix}antinuke disable\`\n\n***COMMANDS***\n﹒*trust*
﹒*untrust*\n﹒*list*\n﹒*features*\n\n***STATUS***\n﹒*Antinuke is ${status} in this server.*`);

    const antinukeFtrs = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`***PROTECTION FEATURES***
\n*All the features are listed below. Every feature is free and every feature has auto recovery enabled.*\n\n
***__PRIMARY __***
﹒*anti webhook [ create, edit, delete ]*
﹒*anti channel [ create, edit, delete ]*
﹒*anti emoji [ create, edit, delete ]*
﹒*anti role [ create, edit, delete ]*
﹒*anti member [ ban, edit, kick ]*

***__SECONDARY__***
﹒*anti community spam*
﹒*anti vanity url snipe*
﹒*anti mass mention*
﹒*anti alt accounts*`);

    const moderationCmds = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription("**__MODERATION__**\n\n*This plugin always stays enabled. If you have required permissions, then you can run moderation commands which are listed below.*\n\n***COMMANDS***\n﹒*ban*\n﹒*kick*\n﹒*nickname*\n﹒*timeout*\n﹒*snipe*\n﹒*editsnipe*\n﹒*unban*\n﹒*nuke*\n\n***USAGES***\n﹒*ban @user*\n﹒*kick @user*\n﹒*nick @user*\n﹒*timeout @user*\n﹒*unban @user*\n﹒*nuke*\n*﹒*snipe*\n﹒*editsnipe*")

    const info = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`**__INFORMATION__**\n\n*Here are some commands which comes under the Information category of the bot.*\n\n***COMMANDS***\n﹒*invite*\n﹒*about*\n﹒*ping*`)

    let x = await db.get(`antiraid_${message.guild.id}`);
    let y;
    
    if (x) y = 'enabled'
    else y = 'disabled';
    
    const antiraid = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**__ANTIRAID__**\n\n*This plugin, if enabled, protects your server from raid actions like anti-alts & anti-massping. All features listed below gets enabled if antiraid is on.*\n\n***ACTIVATION***\n﹒to enable :: \`${prefix}antiraid enable\`\n﹒to disable :: \`${prefix}antiraid disable\`\n\n***FEATURES***\n﹒*anti massping*\n﹒*anti alt account*\n\n***STATUS***\n﹒*Antiraid is ${y} in this server.*\n﹒*More commands are coming soon for this plugin!*`)

    const filter = (i) => i.isSelectMenu();
    const collector = message.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async (i) => {
      if (i.user.id !== message.author.id) {
        i.reply({
          content: 'this menu is not for you.'
        })
      } else {
        await i.deferUpdate();
        const value = i.values[0];

        if (value === 'one') {
          i.editReply({
            embeds: [antinukeCmds],
          })
        } else if (value === 'two') {
          i.editReply({
            embeds: [antinukeFtrs],
          })
        } else if (value === 'three') {
          i.editReply({
            embeds: [moderationCmds],
          })
        } else if (value === 'four') {
          i.editReply({
            embeds: [info],
          })
        } else if (value === 'antiraid') {
          i.editReply({
            embeds: [antiraid],
          })
        }
      }
    })
  }
}