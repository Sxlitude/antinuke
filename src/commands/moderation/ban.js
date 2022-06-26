module.exports = {
    name: "ban",
    aliases: [],
    run: async (client, message, args) => {
     if (!message.member.permissions.has("BAN_MEMBERS")) {
       message.channel.send({ content: `*${message.author.username},* you need **ban members** permission to run that command.` });
     } else {
       const person = message.mentions.members.first();
       if (!person) {
         message.channel.send({ content: `*${message.author.username},* mention someone first.` });
       }
       if (!person.bannable) {
         message.channel.send({ content: `*${message.author.username},* I am unable to ban that person.` });
       } else {
         var reason = args.slice(1).join(" ");
         if (!reason) reason = `banned by ${message.author.tag}`
         person.ban({ reason: `${reason}` });
         if (person.id !== client.userId) {
         message.channel.send({ content: `banned!` });
         }
       }
     }
  },
};