const { MessageEmbed } = require('discord.js');
const Settings = require('../../files/settings');


module.exports = {
  name: 'suggest',
  aliases: ['s', "report"],
  run: async (client, message, args) => {
    const msg = args.join(" ");
    if (!msg) {
      message.channel.send({
        content: 'Provide an issue to report.'
      })
    } else {
      const suggestion = new MessageEmbed()
      .setTitle("New Suggestion")
      .setColor("PURPLE")
      .setDescription(`_ _\n${msg}\n_ _`)
      .setFooter({ text: `by ${message.author.tag}`});

      // Feature Suggested by Hy
      const user = client.users.cache.get(`${Settings.reports.reportDmId}`);
      const channel = client.channels.cache.get(`${Settings.reports.channelId}`); 

      const sendInDms = Settings.reports.sendInDMs;

      if (sendInDms === true) {
        if (user) {
          message.channel.send({
            content: `suggestion/report submitted :thumbsup:`
          });
          user.send({
            embeds: [suggestion]
          })
        }
      } else {
        if (channel) {
          message.channel.send({
            content: `suggestion/report submitted :thumbsup:`
          })
          channel.send({
            embeds: [suggestion]
          })
        }
      }
    };
  }
} 