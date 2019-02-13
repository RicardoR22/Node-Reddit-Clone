const express = require('express')
const exphbs = require('express-handlebars');
const app = express();



const port = process.env.PORT || 4000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.listen(port);
app.use(express.static('public'));

module.exports = app;
