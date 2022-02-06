const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
  name: "tips",
  aliases: [],
  category: "",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    const help = new MessageEmbed()
      .setColor("663399")
      .setDescription(`**#!: Keep My Role Above all the Roles.**
      **#2: For best performance, Give me Proper Permissions.**
      **#3: To get notifications, Keep Your DMs On.**`)
    message.channel.send(help)
    console.log(chalk.blueBright(`[!]: Command => Tips\n[!]: Author => ${message.author.tag}\n[!]: Server => ${message.guild.name}\n`))
  }
};