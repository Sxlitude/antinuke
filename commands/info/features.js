const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'features',
  aliases: ['f'],
  run: async (client, message, args) => {
    const features = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(desc())
    
    message.channel.send({
      embeds: [features]
    })
  }
}

function desc () {
  return `***PROTECTION FEATURES***

***__PRIMARY __***
﹒*anti webhook [ create, edit, delete ]*
﹒*anti channel [ create, edit, delete ]*
﹒*anti emoji [ create, edit, delete ]*
﹒*anti role [ create, edit, delete ]*
﹒*anti member [ ban, edit, kick ]*

***__SECONDARY__***
﹒*anti community spam*
﹒*anti vanity url snipe*
﹒*anti mass mention*
﹒*anti alt accounts*

***__STATEMENTS__***
﹒*it has auto-recovery for all features mentioned above.*
﹒*all the features listed above are free of cost.*`
}