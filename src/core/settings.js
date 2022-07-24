const prefix = process.env.prefix || ';'
const status = `${prefix}help`;


module.exports = {
  bot: {
    info: {
      prefix: process.env.prefix || ';',
      token: process.env.token,
      invLink: 'https://dsc.gg/antiwizz',
    },
    options: {
      founders: ['891214041391988757'],
      privateMode: false,
    },
    presence: {
      name: process.env.statusText || status,
      type: 'STREAMING',
      url: 'https://twitch.tv/pewdiepie'
    },
    credits: {
      developerId: '891214041391988757',
      developer: 'Sxlitude#8885',
      sourceCode: 'https://github.com/sxlitude/antinuke',
      supportServer: 'https://discord.gg/KMw8stwEuN'
    }
  }
}
