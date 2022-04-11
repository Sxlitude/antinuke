const { MessageEmbed } = require("discord.js");
const client = require('../../index');
const chalk = require("chalk");
const Database = require("@replit/database");
const db = new Database();
const { bot } = require('../../files/settings.js');
const prefix = bot.prefix;

const Settings = require('../../files/settings');
const isPrivate = Settings.options.privateMode;

client.on("guildCreate", async (guild) => {
  if (isPrivate === true) {
    let allowed = await db.get(`allowed ${guild.id}`);
    if (allowed !== true) {
      await guild.leave();
    }
  } else {
    const intro = new MessageEmbed()
      .setColor("PURPLE")
      .setFooter({ text: `Prefix is ${prefix} `})
      .setDescription(`***Terror Antinuke***\n*This bot is made to protect your servers from nukes. It is an easy-to-setup bot. No need of a big brain to learn how to use this antinuke. You can learn everything about this antinuke and how to use it in this message.*\n\n***Help & Support***\n﹒*Join the* *__[Discord Server](https://discord.gg/KMw8stwEuN)__* *to get help.*\n﹒*Want to* *__[Contribute?](https://github.com/sxlitude/antinuke)__* *You're most welcome!*`)
    
    const owner = guild.fetchOwner();
    if (owner) {
      owner.send({ embeds: [intro] }).catch((e) => {
        console.log(chalk.redBright(`{!} :: Failed to DM the Owner.. \n`))
      })
    }
  }
});