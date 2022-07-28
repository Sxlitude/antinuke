const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription('__**terror**__\n﹒a powerful antinuke bot\n﹒includes admin whitelisting\n﹒has recovery feature\n\n__**features**__\n﹒anti channels, roles, webhooks\n﹒anti member update, kick, ban\n﹒anti community feature spam\n﹒anti guild vanity url snipe\n\n**;** *use the menu below to know how the bot works*');

    const menuOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpOption')
        .setPlaceholder('click me')
        .addOptions([
          {
            label: 'antinuke commands',
            value: 'cmds',
            description: 'the toggling guide'
          },
          {
            label: 'whitelist commands',
            value: 'wl',
            description: 'the whitelisting guide'
          },
          {
            label: 'bot information',
            value: 'credits',
            description: 'who made this bot?'
          },
        ])
    )

    const disabled = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('uh')
        .setPlaceholder('click me')
        .setDisabled(true)
        .addOptions([
          {
            label: 'this menu is disabled',
            value: 'x',
            description: 'do the command again'
          }
          ])
    )

    message.channel.send({ embeds: [help], components: [menuOptions] }).then((msg) => {
      setTimeout(() => {
        msg.edit({ components: [disabled] });
      }, 10000)
    })

    const cmds = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription('**__antinuke__**\n﹒it bans admins for doing actions in the server\n﹒it ignores whatever whitelisted admins do\n﹒antinuke should be enabled to trigger the bot\n\n>>> **enable**\n﹒run this command `;antinuke enable`\n﹒admins can get banned unless they\'re whitelisted\n\n**disable**\n﹒run this command `;antinuke disable`\n﹒admins can do anything without getting banned')

    const wl = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription('__**whitelisting**__\n﹒the bot doesn\'t trigger on whitelisted admins\n﹒whitelisted admins can do anything in the server\n﹒whitelisted admins __cannot__ whitelist others\n\n> **_whitelist_**\n> ﹒run the command `;whitelist @user`\n> ﹒whitelisted admins __can__ bypass antinuke\n> \n> **_unwhitelist_**\n> ﹒run the command `;unwhitelist @user`\n> ﹒non-whitelisted admins can trigger antinuke\n> \n> **_whitelisted_**\n> ﹒run the command `;whitelisted`\n> ﹒it shows the list of whitelisted users')

    const everyGuild = client.guilds.cache.map((guild) => guild.memberCount);
    const users = everyGuild.reduce((x, y) => x + y);
    
    const credits = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription(`**__credits__**\n﹒shows some bot information\n﹒also tells about the developer\n\n>>> **bot info**\n﹒developer: Sxlitude#8885\n﹒database: mongo DB\n﹒language: node.js\n﹒library: discord.js\n﹒host: heroku\n\n**bot stats**\n﹒users: ${users}\n﹒servers: ${client.guilds.cache.size}\n﹒ping: ${client.ws.ping}ms\n\n**contributors**\n﹒~ Piyush#1972 \n﹒ⴽΛ 𝐉𝐚𝐧𝐞𝐭#6908\n﹒shadowTW#7100\n﹒comy#0001\n﹒troubled#1337\n﹒颢烨 hy#1000\n﹒S.mode#9723\n﹒! 𝐍σт𝐘συя𝓥𝞪η𝓢♄♔🥀†ʰ𝕔#9999\n﹒𝑺𝑻丶༒𝐃𝐄𝐑𝐄𝐊༒⸸ᴳᵀ#3081\n\n**;** made with :heart: by Sxlitude & the contributors.`)

    const filter = (i) => i.isSelectMenu();
    const collector = message.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async (i) => {
      if (i.user.id !== message.author.id) {
        await i.reply({
          content: 'this menu is not for you',
          ephemeral: true,
        })
      } else {
        await i.deferUpdate();
        const value = i.values[0];

        if (value === 'cmds') {
          await i.editReply({ embeds: [cmds] });
        } else if (value === 'wl') {
            await i.editReply({ embeds: [wl] });
        } else if (value === 'credits') {
            await i.editReply({ embeds: [credits] });
        }
      }
    })
  }
}