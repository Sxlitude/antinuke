const client = require('../../index'),
  db = require('../../core/db.js'),
  { bot } = require('../../core/settings.js'),
  chalk = require('chalk'),
  ascii = `

████████╗███████╗██████╗░██████╗░░█████╗░██████╗░
╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
░░░██║░░░█████╗░░██████╔╝██████╔╝██║░░██║██████╔╝
░░░██║░░░██╔══╝░░██╔══██╗██╔══██╗██║░░██║██╔══██╗
░░░██║░░░███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║
░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝                                                    
`;

function logAscii(bot, mode) {
  const x = `\n{!} :: Logged in as ${bot}\n{!} :: Made by Sxlitude#8885\n\n`
  console.log(`${ascii + x}`)
}

client.once("ready", async () => {
  logAscii(client.user.tag);
  client.user.setPresence({
    activities: [bot.presence]
  });
});