// Express App
const express = require("express");
const app = express();
const port = 6969

keepAlive = function () {
  app.listen(port, () => { });
}
app.get('/', (req, res) => { res.send('Hello Express app!')});

module.exports = keepAlive;