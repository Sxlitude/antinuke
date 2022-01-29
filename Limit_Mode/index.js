/*
 * Antinuke: Limit Mode
 * Coded By Sxlitude#8885
*/

const Discord = require('discord.js');
const { Client, Collection, MessageEmbed } = require("discord.js");
// Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android';
const client = new Client();
const chalk = require('chalk');

const Database = require("@replit/database");
const db = new Database();

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// On Ready
client.on("ready", () => {
  console.log(chalk.magentaBright(`
  
░█████╗░███╗░░██╗████████╗██╗███╗░░██╗██╗░░░██╗██╗░░██╗███████╗
██╔══██╗████╗░██║╚══██╔══╝██║████╗░██║██║░░░██║██║░██╔╝██╔════╝
███████║██╔██╗██║░░░██║░░░██║██╔██╗██║██║░░░██║█████═╝░█████╗░░
██╔══██║██║╚████║░░░██║░░░██║██║╚████║██║░░░██║██╔═██╗░██╔══╝░░
██║░░██║██║░╚███║░░░██║░░░██║██║░╚███║╚██████╔╝██║░╚██╗███████╗
╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝╚══════╝
  `))
  console.log(chalk.magentaBright("[!]: Antinuke - Limit Mode"))
  console.log(chalk.magentaBright(`[!]: Logged in as ${client.user.tag}\n\n`))
});

// On Message
client.on("message", async message => {
  let prefix;
  try {
    let customPrefix = await db.get(`prefix_${message.guild.id}`)
    if (customPrefix === null) {
      prefix = ","
    } else {
      prefix = customPrefix;
    }
  } catch { console.log(" ") }

  if (message.content === `<@!${client.user.id}>`) {
    message.channel.send(`prefix for this server is **${prefix}**`)
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix) || !message.content.startsWith(",")) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);


  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

// -----------------[ Anti Nuke ]----------------- \\

// Channel Create
client.on("channelCreate", async (channel) => {
  let antinuke = await db.get(`antinuke_${channel.guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magentaBright(`A Channel was created in ${channel.guild.name} But Antinuke isn't enabled there.`))
  } else {
    const ChannelAuditLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({ limit: 1, type: "CHANNEL_CREATE", });
    const ChannelLogs = ChannelAuditLogs.entries.first();

    if (!ChannelAuditLogs) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${channel.guild.name}`));
    if (!ChannelLogs) return console.log(chalk.red(`[!]: Unable to fetch Channel Creation Logs for ${channel.guild.name}`));

    const { executor, createdTimestamp } = ChannelLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"));

    if (executor.id === channel.guild.owner.id) return;
    if (executor.id === client.user.id) return;

    const ChannelCreation = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Channel Creation**\n> [+] Server :: **${channel.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Channel :: **${channel.name}**\n> [+] Type :: **${channel.type}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**`)

    const ChannelCreationFailed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Channel Creation**\n> [+] Server :: **${channel.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Channel :: **${channel.name}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`channelLimit_${executor.id}-${channel.guild.id}`)
    let serverLimit = await db.get(`channelLimit_${channel.guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;

    if (Log === Event) {
      if (["text", "voice", "category"].includes(channel.type)) {
        await db.set(`channelLimit_${executor.id}-${channel.guild.id}`, limit + 1).then((limit) => {
          setTimeout(() => {
            if (limit === 0) {
              return;
            } else {
              db.set(`channelLimit_${executor.id}-${channel.guild.id}`, limit - 1)
            }
          }, 3600000) // 3600000 -> One Hour
        })
        if (limit < serverLimit) {
          return;
        } else if (limit >= serverLimit) {
          if (channel.guild.member(executor.id).bannable) {
            await db.set(`channelLimit_${executor.id}-${channel.guild.id}`, 0)
            channel.guild.member(executor.id).ban({ days: 7, reason: `Reached Channel Create Limit!` })
            try {
              channel.guild.owner.send(ChannelCreation) && console.log(chalk.yellowBright(`[!]: Notified the Owner`));
            } catch {
              console.log(chalk.red(`{!}: Failed to Delete the Channel or Couldn't DM the Owner.`));
            }
          } else {
            try {
              channel.guild.owner.send(ChannelCreationFailed)
            } catch {
              console.log(chalk.red(`{!}: Failed to DM the Owner.`)) // here
            }
          }
        }
      }
    }
  }
});


// Channel Delete
client.on("channelDelete", async (channel) => {
  let antinuke = await db.get(`antinuke_${channel.guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magentaBright(`A Channel was deleted in ${channel.guild.name} But Antinuke isn't enabled there.`))
  } else {
    const AuditLogsChannel = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE", });
    const ChannelLogs = AuditLogsChannel.entries.first();

    if (!AuditLogsChannel) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${channel.guild.name}`));
    if (!ChannelLogs) return console.log(chalk.red(`[!]: Unable to fetch Channel Deletion Logs for ${channel.guild.name}`));

    const { executor, createdTimestamp } = ChannelLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"));

    if (executor.id === channel.guild.owner.id) return;
    if (executor.id === client.user.id) return;

    const ChannelDeletion = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Channel Deletion**\n> [+] Server :: **${channel.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Channel :: **${channel.name}**\n> [+] Type :: **${channel.type}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**`)
    const ChannelDeletionFailed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Channel Deletion**\n> [+] Server :: **${channel.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Channel :: **${channel.name}**\n> [+] Type :: **${channel.type}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`channeldLimit_${executor.id}-${channel.guild.id}`)
    let serverLimit = await db.get(`channeldLimit_${channel.guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;

    if (Log === Event) {
      if (["text", "voice", "category"].includes(channel.type)) {
        await db.set(`channeldLimit_${executor.id}-${channel.guild.id}`, limit + 1).then((limit) => {
          setTimeout(() => {
            if (limit === 0) {
              return;
            } else {
              db.set(`channeldLimit_${executor.id}-${channel.guild.id}`, limit - 1)
            }
          }, 3600000) // 3600000 -> One Hour
        })

        if (limit < serverLimit) {
          return;
        } else if (limit >= serverLimit) {
          if (channel.guild.member(executor.id).bannable) {
            await db.set(`channeldLimit_${executor.id}-${channel.guild.id}`, 0)
            channel.guild.member(executor.id).ban({ reason: `Reached Channel Delete Limit!` });
            try {
              channel.guild.owner.send(ChannelDeletion)
            } catch (e) {
              console.log(chalk.red(`{!}: Failed to DM the Owner or found some error. ` + e))
            }
          } else {
            try {
              channel.guild.owner.send(ChannelDeletionFailed)
            } catch {
              console.log(chalk.red(`{!}: Failed to DM the Owner.`))
            }
          }
        }
      }
    }
  }
});


// Role Create
client.on("roleCreate", async (role) => {
  let antinuke = await db.get(`antinuke_${role.guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magenta(`A role was created in ${channel.guild.name} But Antinuke isn't enabled there.`))
  } else {
    const RoleAuditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" });
    const RoleLogs = RoleAuditLogs.entries.first();

    if (!RoleAuditLogs) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${role.guild.name}`));
    if (!RoleLogs) return console.log(chalk.red(`[!]: Unable to fetch Role Creation Logs for ${role.guild.name}`));

    const { executor, createdTimestamp } = RoleLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"));

    if (executor.id === role.guild.owner.id || executor.id === client.user.id) return;

    const RoleCreation = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Role Creation**\n> [+] Server :: **${role.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Role :: **${role.name}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**`)
    const RoleCreationFailed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Role Creation**\n> [+] Server :: **${role.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Role :: **${role.name}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`roleLimit_${executor.id}-${role.guild.id}`)
    let serverLimit = await db.get(`roleLimit_${role.guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;

    if (Log === Event) {
      await db.set(`roleLimit_${executor.id}-${role.guild.id}`, limit + 1).then((limit) => {
        setTimeout(() => {
          if (limit === 0) {
            return;
          } else {
            db.set(`roleLimit_${executor.id}-${role.guild.id}`, limit - 1)
          }
        }, 3600000) // 3600000 -> One Hour
      })

      if (limit >= serverLimit) {
        if (role.guild.member(executor.id).bannable) {
          await db.set(`roleLimit_${executor.id}-${role.guild.id}`, 0)
          role.guild.member(executor.id).ban({ reason: `Reached Role Create Limit!` });
          try {
            role.guild.owner.send(RoleCreation);
          } catch { console.log(chalk.red(`{!}: Failed to DM the Owner.`)) }
        } else {
          role.guild.owner.send(RoleCreationFailed)
        }
      }
    }
  }
});


// Role Delete
client.on("roleDelete", async (role) => {
  let antinuke = await db.get(`antinuke_${role.guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magentaBright(`A role was deleted in ${channel.guild.name} But Antinuke isn't enabled there.`))
  } else {
    const AuditLogsRole = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" });
    const RoleLogs = AuditLogsRole.entries.first();

    if (!AuditLogsRole) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${role.guild.name}`));
    if (!RoleLogs) return console.log(chalk.red(`[!]: Unable to fetch Role Deletion Logs for ${role.guild.name}`));

    const { executor, createdTimestamp } = RoleLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"))
    if (executor.id === role.guild.owner.id || executor.id === client.user.id) return;

    const RoleDeletion = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Role Deletion**\n> [+] Server :: **${role.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Role :: **${role.name}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**`)
    const RoleDeletionFailed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Role Deletion**\n> [+] Server :: **${role.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Role :: **${role.name}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`roledLimit_${executor.id}-${role.guild.id}`)
    let serverLimit = await db.get(`roledLimit_${role.guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;

    if (Log === Event) {

      await db.set(`roledLimit_${executor.id}-${role.guild.id}`, limit + 1).then((limit) => {
        setTimeout(() => {
          if (limit === 0) {
            return;
          } else {
            db.set(`roledLimit_${executor.id}-${role.guild.id}`, limit - 1)
          }
        }, 3600000) // 3600000 -> One Hour
      })

      if (limit >= serverLimit) {
        if (role.guild.member(executor.id).bannable) {
          db.set(`roledLimit_${executor.id}-${role.guild.id}`, 0)
          role.guild.member(executor.id).ban({ reason: `Reached Role Delete Limit!` });
          try {
            role.guild.owner.send(RoleDeletion)
          } catch {
            console.log(chalk.red(`{!}: Failed to DM the Owner.`))
          }
        } else {
          role.guild.owner.send(RoleDeletionFailed)
        }
      }
    }
  }
});

// Member Ban
client.on("guildBanAdd", async (guild) => {
  let antinuke = await db.get(`antinuke_${guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magenta(`A Member was banned in ${guild.name} But Antinuke isn't enabled there.`))
  } else {
    const AuditLogsBan = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD", });
    const BanLogs = AuditLogsBan.entries.first();

    if (!AuditLogsBan) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${guild.name}`));
    if (!BanLogs) return console.log(chalk.red(`[!]: Unable to fetch Role Creation Logs for ${guild.name}`));

    const { executor, target, createdTimestamp } = BanLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"));

    if (executor.id === guild.owner.id || executor.id === client.user.id) return;

    const Banned = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Member Ban**\n> [+] Server :: **${guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Victim :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**\n> [+] Unbanned **${target.username}**`)
    const NotBanned = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Member Ban**\n> [+] Server :: **${guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Victim :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**\n> [+] Couldn't Unban **${target.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`banLimit_${executor.id}-${guild.id}`)
    let serverLimit = await db.get(`banLimit_${guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;


    if (Log === Event) {

      await db.set(`banLimit_${executor.id}-${guild.id}`, limit + 1).then((limit) => {
        setTimeout(() => {
          if (limit === 0) {
            return;
          } else {
            db.set(`banLimit_${executor.id}-${guild.id}`, limit - 1)
          }
        }, 3600000) // 3600000 -> One Hour
      })

      if (limit >= serverLimit) {
        if (guild.member(executor.id).bannable) {
          await db.set(`banLimit_${executor.id}-${guild.id}`, 0)
          guild.member(executor.id).ban({ reason: "Reached Ban Limit!" });
          try {
            guild.member(target.id).unban();
            guild.owner.send(Banned)
          } catch (err) {
            console.log(`{!}: Error -- ` + err)
          }
        } else {
          try {
            guild.owner.send(NotBanned);
          } catch { console.log(chalk.red(`{!}: Failed to DM the Owner.`)) }
        }
      }
    }
  }
});

// Member Kick
client.on("guildMemberRemove", async (member) => {
  let antinuke = await db.get(`antinuke_${member.guild.id}`);
  if (antinuke === null) antinuke = "off"
  if (antinuke === "off") {
    return console.log(chalk.magenta(`A Bot was added in ${channel.guild.name} But Antinuke isn't enabled there.`))
  } else {
    const AuditLogsKick = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK", });
    const KickLogs = AuditLogsKick.entries.first();

    if (!AuditLogsKick) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${guild.name}`));
    if (!KickLogs) return console.log(chalk.red(`[!]: Unable to fetch Member Kick Logs for ${guild.name}`));

    const { executor, target, createdTimestamp } = KickLogs;
    if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"))

    if (executor.id === member.guild.owner.id || executor.id === client.user.id) return;

    const Banned = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Member Kick**\n> [+] Server :: **${member.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Victim :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**\n> [+] Unbanned **${target.username}**`)
    const NotBanned = new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Member Kick**\n> [+] Server :: **${member.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Victim :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**\n> [+] Couldn't Unban **${target.username}**`)

    const Timestamps = Date.now();
    const Logtime = createdTimestamp.toString();
    const Eventtime = Timestamps.toString();
    const Log = Logtime.slice(0, 3);
    const Event = Eventtime.slice(0, 3);

    let limit = await db.get(`kickLimit_${executor.id}-${channel.guild.id}`)
    let serverLimit = await db.get(`kickLimit_${channel.guild.id}`)
    if (serverLimit === null) serverLimit = 3;
    if (limit === null) limit = 0;

    if (Log === Event) {
      await db.set(`kickLimit_${executor.id}-${channel.guild.id}`, limit + 1).then((limit) => {
        setTimeout(() => {
          if (limit === 0) {
            return;
          } else {
            db.set(`kickLimit_${executor.id}-${channel.guild.id}`, limit - 1)
          }
        }, 3600000) // 3600000 -> One Hour
      })

      if (limit >= serverLimit) {
        if (member.guild.member(executor.id).bannable) {
          await db.set(`kickLimit_${executor.id}-${member.guild.id}`, 0)
          member.guild.member(executor.id).ban({ reason: "Reached Kick Limit!" });
          try {
            guild.owner.send(Banned)
          } catch (err) {
            console.log(`{!}: Error -- ` + err)
          }
        } else {
          try {
            guild.owner.send(NotBanned);
          } catch { console.log(chalk.red(`{!}: Failed to DM the Owner.`)) }
        }
      }
    }
  }
});

// Anti Bot
client.on("guildMemberAdd", async (bot) => {
  const AuditLogsBot = await bot.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD", })
  const BotLogs = AuditLogsBot.entries.first();

  if (!AuditLogsBot) return console.log(chalk.red(`[!]: Unable to fetch Audit Logs for ${guild.name}`));
  if (!BotLogs) return console.log(chalk.red(`[!]: Unable to fetch Bot Add Logs for ${guild.name}`));

  const { executor, target, createdTimestamp } = BotLogs;
  if (executor.id === null || executor.id === undefined) return console.log(chalk.redBright("{!}: Unable to Find Executor"));

  let trustedusers = db.get(`trustedusers_${bot.guild.id}`);
  if (executor.id === bot.guild.owner.id || executor.id === client.user.id) return;
  if (trustedusers && trustedusers.find(find => find.user == executor.id)) return;

  const Banned = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Bot Addition**\n> [+] Server :: **${bot.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Bot :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Banned **${executor.username}**\n> [+] Banned **${target.username}**`)
  const NotBanned = new MessageEmbed()
    .setColor("RED")
    .setDescription(`> :warning: NOTIFICATION!\n> [+] Event :: **Bot Addition**\n> [+] Server :: **${bot.guild.name}**\n
> :mega: DESCRIPTION:\n> [+] Bot :: **${target.user.tag}**\n> [+] Executor :: **${executor.tag}**\n
> :dart: ACTIONS:\n> [+] Couldn't Ban **${executor.username}**\n> [+] Couldn't Ban **${target.username}**`)

  const Timestamps = Date.now();
  const Logtime = createdTimestamp.toString();
  const Eventtime = Timestamps.toString();
  const Log = Logtime.slice(0, 3);
  const Event = Eventtime.slice(0, 3);

  if (Log === Event) {
    if (bot.guild.member(executor.id).bannable && bot.guild.member(target.id).bannable) {
      bot.guild.member(executor.id).ban({ reason: "Bot Addition is not allowed" });
      bot.guild.member(target.id).ban({ reason: "Unwanted Bot added by untrusted person" });
      try {
        bot.guild.owner.send(Banned);
      } catch {
        console.log(chalk.red(`{!}: Failed to DM the Owner.`))
      }
    } else {
      try {
        bot.guild.owner.send(Failed);
      } catch {
        console.log(chalk.red(`{!}: Failed to DM the Owner.`))
      }
    }
  }
})

client.login(process.env.token);

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

// #1
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
// #2
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
// #3
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
// #4
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
// #5
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
// #6
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});