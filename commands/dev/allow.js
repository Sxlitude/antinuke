const { Message, Client } = require("discord.js");
const db = require('../../core/db');

const settings = require('../../core/settings');
const isPrivate = settings.options.privateMode;
const owners = settings.options.founders;

module.exports = {
  name: "wl",
  aliases: ['allowguild', 'allow'],
  run: async (client, message, args) => {
    if (isPrivate === true) {
      const ID = args[0];
      if (owners.includes(message.author.id)) {
      if (!ID) {
        message.channel.send({ content: `Provide me that guild's ID.` })
      } else if (ID.length !== 18) {
        message.channel.send({ content: `Please provide me a valid guild ID.` })
      } else {
        let allowed = await db.get(`allowed ${ID}`)
        if (allowed === null) allowed = false;
        
        if (allowed === true) {
          message.channel.send({ content: `That guild is already allowed.` });
        } else {
          await db.set(`allowed ${ID}`, true);
          await message.channel.send({ content: `Allowed that guild!` })
          await client.guilds.cache.forEach( (guild) => { arr.push(`${guild.id}`) });
        }
      }
    }
    }
  },
};