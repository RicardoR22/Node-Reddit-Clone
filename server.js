const dotenv = require('dotenv').config();
const express = require('express')
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const port = process.env.PORT || 4000;



// Set db
require('./data/reddit-db');


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// USE COOKIE PARSER
app.use(cookieParser());

app.use(express.static('public'));

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

const post = require('./controllers/posts')(app);
const comment = require('./controllers/comments.js')(app);
const auth = require('./controllers/auth.js')(app);
const reply = require('./controllers/replies.js')(app);



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.listen(port);
module.exports = app;
