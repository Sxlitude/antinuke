module.exports = {
  bot: {
    prefix: ";",
    token: process.env.token,
    invLink: `https://dsc.gg/antiwizz`
  },
  presence: {
    status: 'idle',
    activity: 'LISTENING',
    name: ';help',
    url: 'https://dsc.gg/antiwizz'
  },
  options: {
    founders: ["891214041391988757"],
    privateMode: false,
  },
  onServerJoin: {
    minMemberCount: 6,
    notifyOwner: true
  },
  reports: {
    sendInDMs: true,
    reportDmId: '891214041391988757',
    channelId: '958293762445049906'
  },
  credits: {
    developerId: "891214041391988757",
    developer: "Sxlitude#8885",
    sourceCode: "https://github.com/sxlitude/antinuke",
    supportServer: "https://discord.gg/KMw8stwEuN"
  }
}