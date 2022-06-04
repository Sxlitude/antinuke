const { MessageEmbed } = require("discord.js");
const client = require('../../index');
const chalk = require("chalk");
const db = require('../../core/db');
const { bot } = require('../../core/settings.js');
const prefix = bot.prefix;

const Settings = require('../../core/settings');
const isPrivate = Settings.options.privateMode;
const minCount = Settings.onServerJoin.minMemberCount;

client.on("guildCreate", async (guild) => {
  if (isPrivate === true) {
    let allowed = await db.get(`allowed ${guild.id}`);
    if (allowed !== true) {
      await guild.leave();
      console.log(`${chalk.cyanBright(`{!} :: Left Guild : ${guild.name}`)}\n${chalk.yellowBright(`{!} :: The Guild Was'nt Whitelisted.\n`)}`)
    }
  } else {
    console.log(`${chalk.cyanBright(`{!} :: Joined Guild : ${guild.name}`)}\n${chalk.red(`{!} :: Antinuke Isn't Enabled There.\n`)}`);
    const intro = new MessageEmbed()
      .setColor("PURPLE")
     // .setFooter({ text: `Prefix is ${prefix} `})
      .setDescription(`**__Thanks for adding me to this server.__**

***Overview***
﹒*Over 200k users are protected*
﹒*Tested on superfast nukers*

***Features***
﹒*It protects from 17 types of actions*
﹒*It has recovery feature for free of cost*

***Tips***
﹒*The prefix is* ;
﹒*Run* **;help** *for help*`)
    
    const channel = guild.channels.cache.find(channel => 
      channel.type == "GUILD_TEXT" &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
      );
    if (channel) {
      channel.send({ embeds: [intro ] });

  const x = guild.members.cache.size;
      if (minCount > x) {
        const o = await guild.fetchOwner();
        o.send({
           content: `Your Server **${guild.name}** has less than **${minCount}** members, so i had to leave..`
         })
        guild.leave();
      }
    }
  }
});