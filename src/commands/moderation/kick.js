module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
     if (!message.member.permissions.has("KICK_MEMBERS")) {
       message.channel.send({ content: `*${message.author.username},* you need **kick members** permission to run that command.` });
     } else {
       const person = message.mentions.members.first();
       if (!person) {
         message.channel.send({ content: `*${message.author.username},* mention someone first.` });
       }
       if (!person.kickable) {
         message.channel.send({ content: `*${message.author.username},* I am unable to kick that person.` });
       } else {
         var reason = args.slice(1).join(" ");
         if (!reason) reason = `kicked by ${message.author.tag}`
         person.kick({ reason: `${reason}` });
         if (person.id !== client.userId) {
         message.channel.send({ content: `kicked!` });
         }
       }
     }
  },
};