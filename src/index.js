/* Packages */
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const settings = require('./core/settings');
const phin = require('phin').unpromisified;
const db = require('./core/db');
const chalk = require('chalk');
module.exports = client;


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();


// Handler 
require("./handler")(client);
client.login(settings.bot.info.token).catch((e) => {
  console.log(`${chalk.red(`\n{!} :: Failed to log in.. Please check if your bot token is valid or it has all intents enabled..`)}`)
  setTimeout(() => {
    process.exit();
  }, 5000)
});


client.on('messageCreate', async (message) => {
  const prefix = settings.bot.info.prefix;
  if (message.content === `<@${client.user.id}>`) {
    message.reply(`:grey_question: my prefix for this server is **${prefix}**`)
  }
});

/* Anti Channel Create */
client.on("channelCreate", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: 'CHANNEL_CREATE' });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${channel.guild.id}_wl`).then(async (data) => {
    
    const antinuke = await db.get(`${channel.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === channel.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    channel.delete();
    channel.guild.members.ban(executor.id, {
      reason: "Anti Channel Create"
    });
  });
});

/* Anti Channel Delete */
client.on("channelDelete", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: 'CHANNEL_DELETE' });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${channel.guild.id}_wl`).then(async (data) => {
    
    const antinuke = await db.get(`${channel.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === channel.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    channel.clone();
    channel.guild.members.ban(executor.id, {
      reason: "Anti Channel Delete"
    });
  });
});

/* Anti Channel Update */
client.on("channelUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

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
  });
});

/* Anti Role Create */
client.on("roleCreate", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: 'ROLE_CREATE' });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${role.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${role.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === role.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (role.managed) return;

    role.delete();
    role.guild.members.ban(executor.id, {
      reason: "Anti Role Create"
    });
  });
});

/* Anti Role Update */
client.on("roleUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "ROLE_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    n.setPermissions(o.permissions);
    n.guild.members.ban(executor.id, {
      reason: "Anti Role Update"
    });
  });
});


/* Anti Role Delete */
client.on("roleDelete", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_DELETE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${role.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${role.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === role.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (role.managed) return;

    role.guild.roles.create({ name: role.name, color: role.color });
    role.guild.members.ban(executor.id, { reason: 'Anti Role Delete' });
  });
});


/* Anti Member Update */
client.on("guildMemberUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (n.user.id !== target.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    const oldRoles = o.roles;
    const newRoles = n.roles;

    if (oldRoles !== newRoles) {
      n.roles.set(o.roles.cache);

      n.guild.members.ban(executor.id, {
        reason: `Anti Member Role Update`
      });
    }
  });
});


/* Anti Member Ban */
client.on("guildBanAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_BAN_ADD" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${member.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${member.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
  
    member.guild.members.ban(executor.id, {
      reason: "Anti Member Ban"
    });
    member.guild.members.unban(target.id);
  });
});


/* Anti Member Kick */
client.on("guildMemberRemove", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_KICK" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${member.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${member.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (!logs) return;
    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (member.id !== target.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    member.guild.members.ban(executor.id, {
      reason: "Anti Member Kick"
    });
  });
});


/* Anti Bot Add */
client.on("guildMemberAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;
  
  await db.get(`${member.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${member.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (!logs) return;
    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (!target.bot) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (target.id !== member.id) return;

    member.guild.members.ban(executor.id, {
      reason: "Anti Bot Add"
    });
    member.guild.members.kick(target.id, {
      reason: "illegal bot"
    });
  });
});

/* Anti Webhook Create */
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_CREATE" });
  const logs = auditLog.entries.first();
  const { executor, target } = logs;

  await db.get(`${webhook.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${webhook.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === webhook.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    webhook.guild.members.ban(executor.id, {
      reason: "Anti Webhook Create"
    });
  });
});


/* Anti Webhook Update */
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_UPDATE" });
  const logs = auditLog.entries.first();
  const { executor, target } = logs;

  await db.get(`${webhook.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${webhook.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === webhook.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    webhook.guild.members.ban(executor.id, {
      reason: "Anti Webhook Update"
    });
  });
});

/* Anti Webhook Delete */
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_DELETE" });
  const logs = auditLog.entries.first();
  const { executor, target } = logs;

  await db.get(`${webhook.guild.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${webhook.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === webhook.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    webhook.guild.members.ban(executor.id, {
      reason: "Anti Webhook Delete"
    });
  });
});


/* Anti Guild Update */
client.on("guildUpdate", async (o, n) => {
  const auditLogs = await o.fetchAuditLogs({ limit: 1, type: 'GUILD_UPDATE' });
  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  await db.get(`${n.id}_wl`).then(async (data) => {
    const antinuke = await db.get(`${n.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.ownerId) return;
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

    /* Anti Vanity URL Snipe Suggested By ShadowTW */
    if (o.features.includes('VANITY_URL') && n.features.includes('VANITY_URL')) {
      const oldVanityCode = o.vanityURLCode;
      const newVanityCode = n.vanityURLCode;

      if (oldVanityCode !== newVanityCode) {
        phin({
          method: 'PATCH',
          url: `https://discord.com/api/v9/guilds/${n.id}/vanity-url`,
          json: true,
          headers: {
            "accept": "*/*",
            "Content-Type": 'application/json',
            "Authorization": `Bot ${bot.info.token}`
          },
          data: JSON.stringify({
            code: `${oldVanityCode}`
          }),
        }, (err, res, bod) => {
          if (err) console.log(chalk.red(`[-]: ${err}\n[+]: StatusCode: ${res.statusCode}`));
        })
      }
    }

    if (!n.equals(o)) {
      n.edit({
        features: o.features
      });
    }

    if (!o.features.includes('COMMUNITY') && n.features.includes('COMMUNITY')) {
      const oldFeatures = n.features.filter(f => f !== 'COMMUNITY')
      n.edit({
        features: oldFeatures
      });

      const toDelete = ['rules', 'moderator-only'];
      const x = n.channels.cache.forEach(c => {
        if (toDelete.includes(c.name)) {
          c.delete();
        }
      });
    }
    n.members.ban(executor.id, {
      reason: 'Anti Guild Update'
    });
  });
});

/* When Rate Limited */
client.on('rateLimit', (info) => {
  console.log(chalk.yellow(`${info}\n\n[!]; The bot is rate limited..`))
})


// #1
process.on("unhandledRejection", (reason, promise) => {
  console.log(chalk.red("[-]: " + reason))
});

// #2
process.on("uncaughtException", (err) => {
  console.log(chalk.red("[-]: " + err))
});

// #3
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(chalk.red("[-]: " + err));
});

// #4
process.on('multipleResolves', (type, promise, reason) => {
  console.log(chalk.red("[-]: ", type, promise, reason));
});


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(port, () => {
  console.log('server started');
});
