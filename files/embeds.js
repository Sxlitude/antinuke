const { Client, MessageEmbed } = require('discord.js');
const client = require('../index');

module.exports = {
  Embeds: function (event, guild, executor, target, punishment) {
    if (event === "Channel Creation") {
      return new MessageEmbed()
        .setDescription(`**__EVENT TRIGGERED!__**\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n**__EVENT DETAILS:__**\n\n﹒Executor :: **${executor}**\n﹒Channel :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Channel Deletion") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Channel :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Role Creation") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Role :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Role Deletion") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Role :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Member Kick") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Victim :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Member Ban") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Victim :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Webhook Create") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Webhook :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    } else if (event === "Bot Add") {
      return new MessageEmbed()
        .setDescription(`***__EVENT TRIGGERED!__***\n\n﹒Server :: **${guild}**\n﹒Event :: **${event}**\n\n***__EVENT DETAILS:__***\n\n﹒Executor :: **${executor}**\n﹒Bot :: **${target}**\n﹒Punishment :: **${punishment}**`)
        .setColor("8a2be2")
    }
  },
  InteractionEmbeds: {
    AntinukeCmds: new MessageEmbed()
      .setDescription(`**__ANTINUKE CMDS__**\n\n﹒**Trust***\n*you can trust your admins & bots. \ntrusted users can bypass my security.*\n\n﹒**Untrust***\n*by using this command, you can \nremove a user from the trusted users' list.*\n\n﹒**List**\n*you can view the list of trusted users in \nyour server by running this command.*`)
      .setFooter({ text: `commands marked with * requires you to mention someone.` })
      .setColor("9400d3"),
    Information: function (ping, users, guilds) {
      return new MessageEmbed()
        .setDescription(`**__ANTINUKE: INFO__**\n\n﹒library :: *discord.js*\n﹒coded in :: *JavaScript*\n﹒coded by :: *Sxlitude#8885*\n\n﹒ping :: *${ping}ms*\n﹒servers :: *${guilds}*\n﹒users :: ${users}`)
      .setColor("9400d3")
    },
    AntinukeWiki: new MessageEmbed()
      .setDescription(
        `**__ANTINUKE: WIKI__**
*in this wiki, you will learn how this antinuke works & how to use it correctly. First of all, u will see the concept, then some tips.*

**﹒How does it work?**
*if someone does an action in your server, they are registered in the audit logs.  so, the antinuke checks audit logs to find out what happened & who did it. The person who does the action is called **executor**. and suppose that the person banned someone. The victim is the **target**. the bot checks if the executor is trusted by the owner or not. if the executor is not in the trusted users' list, it bans them. and also, it tries to send a **direct message** to the owner, including what & why happened in it.*

**﹒Things to Note**
*you must provide the antinuke **administrator permissions.** so it can moderate. also, the role of the antinuke should be **above your server admins' role** so it can punish the untrusted executors. you may keep your DMs on if you wish to receive notifications. otherwise the antinuke provides a reason for banning.*`
    )
      .setColor("9400d3"),
  }
}
