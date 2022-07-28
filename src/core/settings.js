const settings = process.env.settings;
const parsedSettings = JSON.parse(settings);
module.exports = parsedSettings;