const client = require('../../index'),
  st = require('../../core/settings'),
  db = require('../../core/db.js');

/* On guild join */
client.on('guildCreate', async (guild) => {
  await db.set(`${guild.id}_wl`, { whitelisted: [] });
});

/* On guild leave */
client.on('guildDelete', async (guild) => {
  await db.set(`${guild.id}_wl`, null);
});