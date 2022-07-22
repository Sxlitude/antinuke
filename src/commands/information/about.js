const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'about',
  aliases: ['botinfo', 'credits', 'abt', 'info'],
  run: async (client, message, args) => {

    const everyGuild = client.guilds.cache.map((guild) => guild.memberCount);
    const users = everyGuild.reduce((x, y) => x + y);

    
    const credits = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor('#2C2F33')
      .setDescription(`**__credits__**\n﹒shows some bot information\n﹒also tells about the developer\n\n>>> **bot info**\n﹒developer: Sxlitude#8885\n﹒database: mongo DB\n﹒language: node.js\n﹒library: discord.js\n﹒host: heroku\n\n**bot stats**\n﹒users: ${users}\n﹒servers: ${client.guilds.cache.size}\n﹒ping: ${client.ws.ping}ms\n\n**contributors**\n﹒~ Piyush#1972 \n﹒ⴽΛ 𝐉𝐚𝐧𝐞𝐭#6908\n﹒shadowTW#7100\n﹒comy#0001\n﹒troubled#1337\n﹒颢烨 hy#1000\n﹒S.mode#9723\n﹒! 𝐍σт𝐘συя𝓥𝞪η𝓢♄♔🥀†ʰ𝕔#9999\n﹒𝑺𝑻丶༒𝐃𝐄𝐑𝐄𝐊༒⸸ᴳᵀ#3081\n\n**;** made with :heart: by Sxlitude & the contributors.`);

    message.channel.send({ embeds: [credits] });
  }
}