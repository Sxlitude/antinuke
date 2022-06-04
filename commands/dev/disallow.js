const { Message, Client } = require("discord.js");
const db = require('../../core/db');

const settings = require('../../core/settings');
const isPrivate = settings.options.privateMode;
const owners = settings.options.founders;

module.exports = {
  name: "bl",
  aliases: ['disallowguild', 'disallow'],
  run: async (client, message, args) => {
    if (isPrivate === true) {
      const ID = args[0];
    
    if (owners.includes(message.author.id)) {
      if (!ID) {
        message.channel.send({ content: `Provide me a guild ID.` })
      } else if (ID.length !== 18) {
        message.channel.send({ content: `Please provide me a valid guild ID.` })
      } else {
        let allowed = await db.get(`allowed ${ID}`)
        if (allowed === null) allowed = false
        if (allowed === false) {
          message.channel.send({ content: `That guild wasn't even allowed tho` })
        } else {
          await db.set(`allowed ${ID}`, false);
          message.channel.send({ content: `Disallowed that guild!` });
          const guild = await client.guilds.cache.get(`${ID}`);
          if (guild) {
            guild.leave();
          }
        }
      }
    }
    }
  },
};