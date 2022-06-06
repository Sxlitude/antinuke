// Collection & Client
const client = require('../index');


client.on('messageDelete', async (message) => {
  client.deletedMsg.set(channel.id, message);
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
  client.updatedMsg.set(channel.id, [oldMsg, newMsg]);
});