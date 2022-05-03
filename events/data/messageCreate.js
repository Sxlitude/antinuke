const client = require('../../index');
const Database = require("@replit/database");
const db = new Database();

client.on("messageCreate", async (message) => {
  var msgCount = await db.get(`msgCount_${message.author.id}`);
  if (msgCount === null) msgCount = 0;
  await db.set(`msgCount_${message.author.id}`, msgCount +1);
});