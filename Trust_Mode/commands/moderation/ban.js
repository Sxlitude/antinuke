//INITIALIZATION
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  category: "moderation",
  description: "Bans the mentioned member",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    //CHECK WHETHER PERSON HAS PERMISSION
    if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    //CHECK WHETHER BOT HAS PERMISSION
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    //INITIALIZE THE MEMBER WHOM TO BAN
    let target = message.mentions.members.first();
    
    //IF NO ONE IS MENTIONED RETURN
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to ban`)
    }
    
    //IF THE MESSAGE AUTHOR IS MENTIONED USER
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not ban yourself`)
    }
    
    //IF NOT REASON IS MENTIONED
    if(!args[1]) {
    return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
  }
    
    //BAN EMBED
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Ban")
    .setDescription(`Banned ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`Banned by ${message.author.username}`);
    
    message.channel.send(embed)
    
    //BAN THE MEMBER
    target.ban(args[1]);
  }
};
