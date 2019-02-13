//posts.js

// Index
app.get('/', (req, res) => {
    res.render('home', { msg: 'handlebars are cool'});
})

// New
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})
