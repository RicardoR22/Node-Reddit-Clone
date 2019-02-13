const express = require('express')
const exphbs = require('express-handlebars');
const app = express();
const post = require('./controllers/posts')(app);
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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.listen(port);
app.use(express.static('public'));

module.exports = app;
