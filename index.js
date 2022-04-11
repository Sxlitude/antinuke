// Files
const { Embeds } = require(`./files/embeds`);

// Packages
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const chalk = require('chalk');
module.exports = client;

// Hosting
const keepAlive = require('./files/server');
keepAlive();

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Handler 
require("./handler")(client);
client.login(process.env.token).catch((e) => {
  console.log(`${chalk.red(`\n{!} :: Failed to log in.. Please check if your bot tokem is valid or it has all intents enabled..`)}`)
  setTimeout(() => {
    process.exit();
  }, 5000)
});

// Database
const Database = require("@replit/database");
const db = new Database();

// Message Create
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes("terror")) {
    msg.react(`<:terror:958293936739328051>`);
  }
});

// Channel Create
client.on("channelCreate", async (channel) => {
  
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_CREATE" });
  const channelLogs = auditLogs.entries.first();

  if (!auditLogs) return;
  if (!channelLogs) return;

  const { executor, target, createdTimestamp } = channelLogs;

  let trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${channel.guild.id}`);
  const nuker = await channel.guild.members.fetch(executor.id);
  const owner = await channel.guild.fetchOwner();

  const Banned = Embeds("Channel Creation", channel.guild.name, executor.username, channel.name, "Banned");
  const Failed = Embeds("Channel Creation", channel.guild.name, executor.username, channel.name, "Couldn't Ban");

  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (executor.id == owner.id || executor.id == client.user.id) return;

  if (enabled === true) {
    if (log === event) {
    if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Channel Create` });
      await owner.send({ embeds: [Banned] });
      } else {
        await owner.send({ embeds: [Failed] });
      }
    }
  }
  }
});

// Channel Delete
client.on("channelDelete", async (channel) => {

  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE" });
  const channelLogs = auditLogs.entries.first();
  
  if (!auditLogs) return;
  if (!channelLogs) return;

  const { executor, createdTimestamp } = channelLogs;

  let trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${channel.guild.id}`);
  const nuker = await channel.guild.members.fetch(executor.id);
  const owner = await channel.guild.fetchOwner();

  const Banned = Embeds("Channel Deletion", channel.guild.name, executor.username, channel.name, "Banned");
  const Failed = Embeds("Channel Deletion", channel.guild.name, executor.username, channel.name, "Couldn't Ban");

  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (executor.id == owner.id || executor.id == client.user.id) return;

  if (enabled === true) {
  if (log === event) {
    if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Channel Delete` });
      await owner.send({ embeds: [Banned] });
    } else {
      await owner.send({ embeds: [Failed] });
      }
    }
  }
  }
});

// Role Create
client.on("roleCreate", async (role) => {

  const roleAuditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" });
  const roleLogs = roleAuditLogs.entries.first();

  if (!roleAuditLogs) return;
  if (!roleLogs) return;

  const { executor, createdTimestamp } = roleLogs;

  let trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${role.guild.id}`);
  const nuker = await role.guild.members.fetch(executor.id);
  const owner = await role.guild.fetchOwner();

  const Banned = Embeds("Role Creation", role.guild.name, executor.username, role.name, "Banned");
  const Failed = Embeds("Role Creation", role.guild.name, executor.username, role.name, "Couldn't Ban");
  
  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (log === event) {
    if (enabled === true) {
    if (executor.id == owner.id || executor.id == client.user.id) return;
  if (trusted !== true) {
    if (nuker) {
        if (nuker.bannable) {
          if (nuker.user.bot) {
            if (role.name === `${executor.username}`) {
              var bot = db.get(`sus_${role.guild.id}-${executor.username}`);
              db.set(`sus_${role.guild.id}-${executor.username}`, bot + 1)
              setTimeout(() => {
                db.set(`sus_${role.guild.id}-${executor.username}`, 0)
              }, 5000);
            }
            var sus = db.get(`sus_${role.guild.id}-${executor.username}`);
            if (sus === 2) {
              await nuker.ban({ reason: `Anti Role Create` });
              await wner.send({ embeds: [Banned] });
            }
          } else {
            await nuker.ban({ reason: `Anti Role Create` });
            await owner.send({ embeds: [Banned] });
          }
      } else {
        owner.send({ embeds: [Failed] });
      }
    }
  }
    }
  }
});

// Role Delete
client.on("roleDelete", async (role) => {
  
  const roleAuditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_DELETE", }).catch(e => {});
  const roleLogs = roleAuditLogs.entries.first();
  
  if (!roleAuditLogs) return;
  if (!roleLogs) return;

  const { executor, createdTimestamp } = roleLogs;

  let trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${role.guild.id}`);
  const nuker = await role.guild.members.fetch(executor.id);
  const owner = await role.guild.fetchOwner();

  const Banned = Embeds("Role Deletion", role.guild.name, executor.username, role.name, "Banned");
  const Failed = Embeds("Role Deletion", role.guild.name, executor.username, role.name, "Couldn't Ban");

  if (executor.id == owner.id || executor.id == client.user.id) return;

  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);
  
  if (log === event) {
    if (enabled === true) {
  if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Role Delete` });
      await owner.send({ embeds: [Banned] });
    } else {
      await owner.send({ embeds: [Failed] });
      }
    }
  }
  }
});

// Member Ban
client.on("guildBanAdd", async (member) => {
  
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
  const banLogs = auditLogs.entries.first();

  if (!auditLogs) return;
  if (!banLogs) return;

  const { executor, target, createdTimestamp } = banLogs;

  let trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${member.guild.id}`);
  const nuker = await member.guild.members.fetch(executor.id);
  const owner = await member.guild.fetchOwner();

  const Banned = Embeds("Member Ban", member.guild.name, executor.username, target.username, "Banned");
  const Failed = Embeds("Member Ban", member.guild.name, executor.username, target.username, "Couldn't Ban");

  if (executor.id == owner.id || executor.id == client.user.id) return;
  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (log === event) {
    if (enabled === true) {
  if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Member Ban` });
      await owner.send({ embeds: [Banned] });
    } else {
      await owner.send({ embeds: [Failed] });
    }
  }
  }
  }
});


// Member Kick
client.on("guildMemberRemove", async (member) => {
  
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
  const kickLogs = auditLogs.entries.first();

  if (!auditLogs) return;
  if (!kickLogs) return;

  const { executor, target, createdTimestamp } = kickLogs;

  let trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${member.guild.id}`);
  const nuker = await member.guild.members.fetch(executor.id);
  const owner = await member.guild.fetchOwner();

  const Banned = Embeds("Member Kick", member.guild.name, executor.username, target.username, "Banned");
  const Failed = Embeds("Member Kick", member.guild.name, executor.username, target.username, "Couldn't Ban");

  if (executor.id == owner.id || executor.id == client.user.id) return;

  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (log === event) {
    if (enabled === true) {
  if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Member Kick` });
      await owner.send({ embeds: [Banned] });
    } else {
      await owner.send({ embeds: [Failed] });
    }
  }
  }
  }
});


client.on("webhookUpdate", async (channel) => {
  
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" });
  const wLogs = auditLogs.entries.first();

  if (!auditLogs) return;
  if (!wLogs) return;

  const { executor, target, createdTimestamp } = wLogs;

  let trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  let enabled = await db.get(`antinuke_${channel.guild.id}`);

  const nuker = await channel.guild.members.fetch(executor.id);
  const owner = await channel.guild.fetchOwner();

  const Banned = Embeds("Webhook Create", channel.guild.name, executor.username, target.name, "Banned");
  const Failed = Embeds("Webhook Create", channel.guild.name, executor.username, target.name, "Couldn't Ban");

  if (executor.id == owner.id || executor.id == client.user.id) return;
  const timestamps = Date.now();
  const logTime = createdTimestamp.toString();
  const eventTime = timestamps.toString();
  const log = logTime.slice(0, 3);
  const event = eventTime.slice(0, 3);

  if (log === event) {
    if (enabled === true) {
  if (trusted !== true) {
    if (nuker.bannable) {
      await nuker.ban({ reason: `Anti Webhook Create` });
      await owner.send({ embeds: [Banned] });
    } else {
      await owner.send({ embeds: [Failed] });
    }
  }
  }
  }
});


// #1
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
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
