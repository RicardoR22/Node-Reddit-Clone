//posts.js
const Post = require('../models/post');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = function(app) {

    // Use Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Add after body parser initialization!
    app.use(expressValidator());

    
    // Index
    app.get('/', (req, res) => {
        res.render('posts-index', { msg: 'handlebars are cool'});
    })

    // New
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
    });

}
