const client = require('../../index');
const Database = require("@replit/database");
const db = new Database();

const Settings = require('../../files/settings');
const isPrivate = Settings.options.privateMode;

client.on("guildCreate", async (guild) => {
  if (isPrivate === true) {
    let allowed = await db.get(`allowed ${guild.id}`);
    if (allowed !== true) {
      await guild.leave();
    }
  }
});