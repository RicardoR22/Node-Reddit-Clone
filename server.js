const dotenv = require('dotenv').config();
const express = require('express')
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const post = require('./controllers/posts')(app);
const comment = require('./controllers/comments.js')(app);
const auth = require('./controllers/auth.js')(app);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


// Set db
require('./data/reddit-db');

const port = process.env.PORT || 4000;

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// USE COOKIE PARSER
app.use(cookieParser());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.listen(port);
app.use(express.static('public'));

module.exports = app;
