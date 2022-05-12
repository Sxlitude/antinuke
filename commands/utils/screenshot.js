const { MessageEmbed } = require("discord.js");
module.exports = {
  name: 'screenshot',
  aliases: ['ss'],
  run: async (client, message, args) => {
    const url = args[0];
    if (!url) {
      message.channel.send({
        content: 'Please specify a URL. Example: `ss github.com`'
      })
    } else {
      const res = `https://api.popcat.xyz/screenshot?url=https://${url}`.toLowerCase();
      const ss = new MessageEmbed()
      .setTitle('screenshot')
      .setColor("PURPLE")
      .setImage(`${res}`)
      //.setDescription('screenshot')
      message.channel.send({
        embeds: [ss]
       })
    }
  }
} 