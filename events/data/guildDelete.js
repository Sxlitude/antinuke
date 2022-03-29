const client = require('../../index');
const Database = require("@replit/database");
const db = new Database();

client.on("guildDelete", async guild => {
  await db.list(`${guild.id}`).then(async (keys) => {
    for (x in keys) {
      let key = keys[x]
      await db.delete(`${key}`)
    }
  });
});