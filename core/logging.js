const { MessageEmbed } = require('discord.js');
const client = require('../index')

const Database = require('@replit/database');
const db = new Database();


module.exports = {
  EmbedLogger: async (guild, action, exec, target) => {
    const Guild = guild.guild || guild;
    const Member = await Guild.members.cache.get(exec.id);
    const Owner = await Guild.fetchOwner();

    var enabled = await db.get(`logging_${Guild.id}`);
    
    var result;
    if (Member.bannable) result = 'Banned the executor'
    else result = 'Couldn\'t ban the executor';
    
    Log = new MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`***AN EVENT HAS BEEN TRIGGERED***\n\n***Overview***\n﹒Server :: ${Guild.name}\n﹒Action :: ${action}\n﹒Executor :: ${exec.tag}\n﹒${action.split(" ")[0]} :: ${target.name}\n\n***Punishment***\n﹒${result}\n﹒Reversed the action`)
    if (enabled) {
      Owner.send({ embeds: [Log] });
    }
  }
}