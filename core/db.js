const {Database} = require('quickmongo')
const db = new Database(process.env.mongourl);
db.connect()

module.exports = db;