const { Database } = require('quickmongo');
const db = new Database(process.env.mongoDB);
db.connect().then(() => console.log('{!}; Connected to Mongo Database!'));
module.exports = db;