const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "moderation",
  aliases: ['m'],
  run: async (client, message, args) => {
    const help = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription("**__MODERATION__**\n\n*This plugin always stays enabled. If you have required permissions, then you can run moderation commands which are listed below.*\n\n***COMMANDS***\n﹒*ban*\n﹒*kick*\n﹒*nickname*\n﹒*timeout*\n﹒*nuke*\n\n***USAGES***\n﹒*ban @user*\n﹒*kick @user*\n﹒*nick @user*\n﹒*timeout @user*\n﹒*unban @user*\n﹒*nuke*")
    // Sending
    message.reply({
      embeds: [help],
      repliedUser: false,
   });
  },
};
