const  { User }  = require('./models');
const bcrypt = require('bcrypt');

module.exports = {
  getUserByUsername: (req, res) => {
    console.log("Here we are", req.body);
    const DATA = req.body;
    User.findOne({username: req.body.username})
      .then(data => {
        console.log(data);
        bcrypt.compare(DATA.password, data['password'], (err, result) => {
          console.log("This is ", result);
          if (result) {
            res.json(data);
          }
          else {
            res.json(err);
          }
        })
      })
      .catch(err => res.json(err));
  },

  allPosts: (req, res) => {
    User.find()
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },

  newUser: (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
			if (err) {
					res.json({ dupError: 'That username already exists' });
			} else {
					if (user) {
							res.json({ dupError: 'That username already exists' });
					} else {
              DATA = req.body;
              bcrypt.hash(DATA.password, 10, (err, hash) => {
                if (hash) {
                  DATA.password = hash;
                  User.create(DATA, err => {
                      if (err) {
                          res.json(err);
                      } else {
                          res.json({ success: true });
                      }
                  });

                }
              });
					}
			}
    });
  },

  findUser: (req, res) => {
    const ID = req.params.id;
    User.findById({_id: ID})
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },

  createPost: (req, res) => {
    const UN = req.params.username;
    const DATA = req.body;
    User.updateOne({username: UN }, {$push: {posts: DATA}}, {runValidators: true, new: true})
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },
}