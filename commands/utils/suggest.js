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

      const channel = client.channels.cache.get(`${Settings.options.reportChannelId}`);
      if (channel) {
        message.channel.send({
          content: `suggestion/report submitted :thumbsup:`
        })
        channel.send({
          embeds: [suggestion]
        })
      }
    };
  }
} 