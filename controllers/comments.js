//comments.js
const Post = require('../models/post');
const Comment = require('../models/comment');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = function(app) {

    // Use Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Add after body parser initialization!
    app.use(expressValidator());


    // CREATE Comment
    app.post("/posts/:postId/comments", function(req, res) {
      // INSTANTIATE INSTANCE OF MODEL
      const comment = new Comment(req.body);

      // SAVE INSTANCE OF Comment MODEL TO DB
      comment
        .save()
        .then(comment => {
          return Post.findById(req.params.postId);
        })
        .then(post => {
          post.comments.unshift(comment);
          return post.save();
        })
        .then(post => {
          res.redirect(`/`);
        })
        .catch(err => {
          console.log(err);
        });
    });

}
