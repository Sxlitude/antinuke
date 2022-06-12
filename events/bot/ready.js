const client = require("../../index");
const chalk = require("chalk");
const gradient = require("gradient-string");
const Settings = require('../../core/settings.js');
const db = require('../../core/db');
const isPrivate = Settings.options.privateMode;

const activity = {
  status: Settings.presence.status,
  type: Settings.presence.type,
  prefix: Settings.bot.prefix,
  url: Settings.bot.url,
  name: Settings.presence.name,
}

const ascii = `

████████╗███████╗██████╗░██████╗░░█████╗░██████╗░
╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
░░░██║░░░█████╗░░██████╔╝██████╔╝██║░░██║██████╔╝
░░░██║░░░██╔══╝░░██╔══██╗██╔══██╗██║░░██║██╔══██╗
░░░██║░░░███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║
░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝                                                    
`;

function logAscii(bot, mode) {
  const x = `\n{!} :: Logged in as ${bot}\n{!} :: Bot is on ${mode} Mode\n\n`
  const colors = [
    gradient(`orange`, `red`)(ascii + x),
    gradient(`magenta`, `purple`)(ascii + x),
    gradient(`cyan`, `blue`)(ascii+ x),
    gradient(`lime`, `yellow`)(ascii + x),
    gradient(`lime`, `cyan`)(ascii+ x),
  ]
  console.log(`${colors[Math.floor(Math.random() * colors.length)]}`)
}


client.once("ready", async () => {
  await db.connect()
  await db.set(`uptime`, `${Math.floor(Date.now() / 1000)}`)

  /*
  client.user.setPresence({
    activities: [{
      name: `${activity.name}`,
      type: `${activity.type}`,
      url: `${activity.url}`
    }], status: `${activity.status}` 
  });
  */

  client.user.setPresence({
    activities: [{
      name: `;help`,
      type: `LISTENING`
    }], status: `idle`
  });

  if (isPrivate === true) {
    logAscii(client.user.tag, 'Private');
  } else if (isPrivate === false) {
    logAscii(client.user.tag, 'Public');
  }
});
