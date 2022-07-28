module.exports = {
  name: "nick",
  aliases: ["nickname", "setnick"],
  run: async (client, message, args) => {
    const nickname = args[0];
    if (!message.member.permissions.has("MANAGE_MEMBERS")) {
      message.channel.send({ content: `*${message.author.username}*, you need **manage members** permission to do that.`});
    } else {
      const member = message.mentions.members.first();
      if (!member) {
        message.channel.send({ content: `Mention someone first.`});
      } 
      if (!member.manageable) {
        message.channel.send({ content: `i don't have access to manage this member.` });
      } else {
        if (!nickname) {
          message.channel.send({ content: `provide me a nickname to set.` });
        } else {
        member.setNickname(`${nickname}`);
        message.channel.send({ content: `Done, the nickname is updated to *${nickname}*.`});
        }
      }
    }
  },
};