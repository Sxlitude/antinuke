const { MessageEmbed } = require('discord.js'),
  st = require('../../core/settings').bot,
  db = require('../../core/db.js');


module.exports = {
  name: 'dmlogs',
  aliases: ['dm', 'logging'],
  run: async (client, message, args) => {
    const antinuke = await db.get(`${message.guild.id}_antinuke`);
    if (antinuke) {
    let prefix = await db.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = st.info.prefix;
    
    const guide = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`_**DM Logging**_

**Commands**
﹒To enable DM Logging: *${prefix}dmlogs enable*
﹒To disable DM Logging: *${prefix}dmlogs disable*

**If Logging is Enabled:**
﹒info of unauthorized actions will ve sent in dms.
﹒this info will be sent to the server owner only.`);

    const option = args[0];
    const isActivatedAlready = await db.get(`${message.guild.id}_dmlogs`);

    if (message.author.id === message.guild.ownerId) {
      if (!option) {
        message.reply({ embeds: [guide] });
      } else if (option === 'enable') {
        if (isActivatedAlready) {
          message.reply(`:warning: the dmlogs are already enabled.`)
        } else {
          await db.set(`${message.guild.id}_dmlogs`, true);
          message.reply(`:thumbsup: enabled the dmlogs for this server.`);
        }
      } else if (option === 'disable') {
        if (!isActivatedAlready) {
          message.reply(`:warning: the dmlogs are already disabled.`)
          } else {
              await db.delete(`${message.guild.id}_dmlogs`);
              message.reply(`:thumbsup: disabled the dmlogs for this server.`);
            }
          }
        } else {
          message.reply({ embeds: [guide] });
        }
      } else {
      message.reply('to use this command, you need to enable the antinuke.')
    }
  }
}