// Button Pagination and Discord.js
const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../../index");

const Settings = require("../../core/settings");

// Command
module.exports = {
  name: "invite",
  aliases: ['i'],
  run: async (client, message, args) => {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`${Settings.bot.invLink}`)
    )
    
    // Sending
    message.reply({
      content: "Click the button below.", 
      components: [button] });
  },
};