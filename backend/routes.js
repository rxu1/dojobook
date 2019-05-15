const controllers = require('./controllers');

module.exports = app => {
    app
    .get('/users', controllers.allPosts)
    .get('/users/:id', controllers.findUser)
    .post('/users/login', controllers.getUserByUsername)
    .post('/users/new', controllers.newUser)
    .put('/users/post/:username', controllers.createPost)
}