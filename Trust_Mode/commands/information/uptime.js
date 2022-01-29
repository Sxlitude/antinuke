const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "uptime",
  aliases: ["online"],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    function duration (ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (60 * 1000)) % 60).toString();
    const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
    const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
    return `${days} Days, ${hrs} Hours, ${min} Minutes, ${sec} Seconds`;
  }
    try {
      const uptime = new MessageEmbed()
        .setDescription(`my uptime is **${duration(client.uptime)}.**`)
        .setColor("c09999")
      message.channel.send(uptime);
    } catch (e) {
      console.log(e)
    }
  }
};