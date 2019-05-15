const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 8000;
const path = require('path');
const app = express();

app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());

app.set('trust proxy', 1)
app.use(session({
  secret: 'secret session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.listen(port, () => console.log(`Listening on port ${port}`));
require('./backend/routes')(app);
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
