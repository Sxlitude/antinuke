const { Database } = require('quickmongo');
const db = new Database(process.env.mongoUrl);

db.connect().then(() => {
  console.log('{!}; Connected to Mongo Database!');
}).catch((e) => {
  console.log(e);
});

module.exports = db;