const { MessageEmbed } = require('discord.js'),
  st = require('../../core/settings').bot,
  db = require('../../core/db.js');


module.exports = {
  name: 'antinuke',
  aliases: ['antiwizz', 'an'],
  run: async (client, message, args) => {
    const prefix = st.info.prefix;
    const option = args[0];
    const isActivatedAlready = await db.get(`${message.guild.id}_antinuke`);

    const antinuke = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription('**__antinuke__**\n﹒it bans admins for doing actions in the server\n﹒it ignores whatever whitelisted admins do\n﹒antinuke should be enabled to trigger the bot\n\n>>> **enable**\n﹒run this command `;antinuke enable`\n﹒admins can get banned unless they\'re whitelisted\n\n**disable**\n﹒run this command `;antinuke disable`\n﹒admins can do anything without getting banned')

    if (message.author.id === message.guild.ownerId) {
      if (!option) {
        message.reply({ embeds: [antinuke] });
      } else if (option === 'enable') {
        if (isActivatedAlready) {
          message.reply(`the antinuke is already enabled.`)
        } else {
          await db.set(`${message.guild.id}_antinuke`, true);
          message.reply(`enabled the antinuke for this server.`);
          await db.set(`${message.guild.id}_wl`, { whitelisted: [] });
         }
      } else if (option === 'disable') {
        if (!isActivatedAlready) {
          message.reply(`the antinuke is already disabled.`)
        } else {
          await db.set(`${message.guild.id}_antinuke`, null);
          message.reply(`disabled the antinuke for this server.`);
        }
      }
    } else {
      message.reply({ content: 'you need to be the server owner to run this command.' });
    }
  }
}