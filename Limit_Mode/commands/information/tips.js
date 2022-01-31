const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "tips",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setTitle("tips")
      .setColor("ffff00")
      .setDescription(`**#!: Keep My Role Above all the Roles.**
      ﹒this is because it's required for me that im able to ban everyone (but im not a nuke bot)
      **#2: Gimme Proper Permissions.**
      ﹒this is important to give me permissions so that i can take actions on bad executors.
      **#2: Keep Your DMs On**
      ﹒to get notifications, keep your DMs on so that im always able to send you messages.`)
    message.channel.send(help)
  }
};