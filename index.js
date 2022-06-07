// Files
const { EmbedLogger } = require(`./core/logging`);

const { bot } = require('./core/settings');
const prefix = bot.prefix;

// Packages
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const chalk = require('chalk');
module.exports = client;
/*
// Hosting
const keepAlive = require('./files/server');
keepAlive();
*/

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.deletedMsg = new Collection();
client.updatedMsg = new Collection();


// Handler 
require("./handler")(client);
client.login(process.env.token).catch((e) => {
  console.log(`${chalk.red(`\n{!} :: Failed to log in.. Please check if your bot token is valid or it has all intents enabled..`)}`)
  setTimeout(() => {
    process.exit();
  }, 5000)
});

// Database
// const Database = require("@replit/database");
// const db = new Database();
const db = require('./core/db');

client.on('messageCreate', async (message) => {
  let prefix;
  const dbPrefix = await db.get(`pre_${message.guild.id}`);
  
  if (dbPrefix) {
    prefix = dbPrefix;
  } else {
    prefix = ';'
  };
  
  //const pre = dbPrefix || ';';

  if (message.content === `<@${client.user.id}>`) {
    message.reply(`:grey_question: my prefix for this server is **${prefix}**`)
  }
})

// Anti Channel Create
client.on("channelCreate", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  
  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);
  

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  channel.delete();
  channel.guild.members.ban(executor.id, { 
    reason: "Anti Channel Create"
  });
  
  EmbedLogger(channel, 'Channel Creation', executor, target); 
}); 


// Anti Channel Delete
client.on("channelDelete", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  
  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  channel.clone();
  channel.guild.members.ban(executor.id, { 
    reason: "Anti Channel Delete"
  });
  
  EmbedLogger(channel, 'Channel Deletion', executor, target);
});   


// Anti Role Create
client.on("roleCreate", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;
  

  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);

  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  if (role.managed) return;

  role.delete();
  role.guild.members.ban(executor.id, { 
    reason: "Anti Role Create"
  });

  EmbedLogger(role, 'Role Creation', executor, target);
});    

// Anti Role Delete
client.on("roleDelete", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  
  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);
  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  if (role.managed) return;
  
  role.guild.roles.create({
    name: role.name,
    color: role.color,
  });
  role.guild.members.ban(executor.id, { 
    reason: "Anti Role Delete"
  });

  EmbedLogger(role, 'Role Deletion', executor, target);
});

// Anti Emoji Create
client.on("emojiCreate", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 2, type: "EMOJI_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;
  

  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  emoji.guild.members.ban(executor.id, { 
    reason: "Anti Emoji Create"
  });

  EmbedLogger(emoji, 'Emoji Creation', executor, target);
});


// Anti Emoji Update
client.on("emojiUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "EMOJI_UPDATE" });
  const logs = auditLogs.entries.first();

  const { executor, target } = logs;
  
  
  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === n.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  n.setName(o.name);
  n.guild.members.ban(executor.id, { 
    reason: "Anti Emoji Update"
  });

  EmbedLogger(o, 'Emoji Update', executor, target);
});


// Anti Emoji Delete
client.on("emojiDelete", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 2, type: "EMOJI_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;


  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  emoji.guild.members.ban(executor.id, { 
    reason: "Anti Emoji Delete"
  });

  EmbedLogger(emoji, 'Emoji Delete', executor, target);
});


// Anti Member Update
client.on("guildMemberUpdate", async (o,n) => {
  const auditLogs = await o.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
  const logs = auditLogs.entries.first();
  if (logs) {
    const { executor, target } = logs;
    
  
    const trusted = await db.get(`trust${o.guild.id} ${executor.id}`);
    const antinuke = await db.get(`antinuke_${o.guild.id}`);
  
    if (executor.id === o.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (executor.id !== n.user.id) return;

    n.edit(o);
    n.guild.members.ban(executor.id, {
      reason: "Anti Member Update"
    });
    //n.guild.members.cache.fetch

  EmbedLogger(o, 'Member Update', executor, target);
  }
});


// Anti Member Ban
client.on("guildBanAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_BAN_ADD" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const bans = [];
  bans.push(target.id);

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  member.guild.members.kick(executor.id, { 
    reason: "Anti Member Ban"
  });

  bans.forEach(bannedUser => {
    member.guild.members.unban(bannedUser)
  });

  EmbedLogger(member, 'Member Ban', executor, target);
});


// Anti Member Kick
client.on("guildMemberRemove", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_KICK" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  
  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);

  if (!logs) return;
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  member.guild.members.ban(executor.id, { 
    reason: "Anti Member Kick"
  });

  EmbedLogger(member, 'Member Kick', executor, target);
});


// Anti Bot Add
client.on("guildMemberAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" });

  const logs = auditLogs.entries.first();
  if (logs) {
    const { executor, target } = logs;


    const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
    const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (target.bot !== true) return;
    if (antinuke !== true) return;
    if (trusted === true) return;


    member.guild.members.ban(executor.id, { 
      reason: "Anti Bot Add"
    });
    member.guild.members.kick(target.id, { 
      reason: "illegal bot"
    });

  EmbedLogger(member, 'Bot Add', executor, target);
  }
});


// Anti Role Update
client.on("roleUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "ROLE_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  n.setPermissions(o.permissions);
  n.guild.members.ban(executor.id, {
    reason: "Anti Role Update"
  });

  EmbedLogger(o, 'Role Update', executor, target);
});


// Anti Channel Update
client.on("channelUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldName = o.name;
  const newName = n.name;
  
  n.guild.members.ban(executor.id, {
  reason: "Anti Channel Update"
});

  if (oldName !== newName) {
    await n.edit({
      name: oldName
    })
  }
  
  if (n.isText()) {
    const oldTopic = o.topic;
    const newTopic = n.topic;
    if (oldTopic !== newTopic) {
      await n.setTopic(oldTopic)
    }
  }

  EmbedLogger(o, 'Channel Update', executor, target);
});

// Anti Webhook Create 
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_CREATE" });
  const logs = auditLog.entries.first();

  const { executor, target } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Anti Webhook Create"
  });

  EmbedLogger(webhook, 'Webhook Creation', executor, target);
});


// Anti Webhook Update 
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_UPDATE" });
  const logs = auditLog.entries.first();

  const { executor, target } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Anti Webhook Update"
  });

  EmbedLogger(webhook, 'Webhook Update', executor, target);
});


// Anti Webhook Delete 
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_DELETE" });
  const logs = auditLog.entries.first();

  const { executor, target } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Anti Webhook Delete"
  });

  EmbedLogger(channel, 'Webhook Delete', executor, target);
});


// Anti Server Update
client.on("guildUpdate", async (o,n) => {
  const auditLogs = await n.fetchAuditLogs({ limit: 3, type: "GUILD_UPDATE" });
  const logs = auditLogs.entries.first();

  const { executor, target } = logs;
  
  const trusted = await db.get(`trust${n.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.id}`);
  
  if (executor.id === o.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldIcon = o.iconURL();
  const oldName = o.name;
  
  const newIcon = n.iconURL(); 
  const newName = n.name;

  if (oldName !== newName) {
    await n.setName(oldName);
  }

  if (oldIcon !== newIcon) {
    await n.setIcon(oldIcon);
  }
  
  n.members.ban(executor.id, {
    reason: "Anti Guild Update"
  });

  EmbedLogger(o, 'Server Update', executor, target);
});


// #1
process.on("unhandledRejection", (reason, promise) => {
  // console.log("Unhandled Rejection at: " + promise)
   console.log(chalk.red("[-]: " + reason))
});

// #2
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
});

// #3
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});

// #4
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});