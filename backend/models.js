const mongoose = require('mongoose');
const connect = 'mongodb://localhost/dojobook'; 

mongoose.connect(connect, {useNewUrlParser:true});

const UserSchema = mongoose.Schema({
    username: {
        type: String, 
        minlength: [3, 'The username must be at least 3 characters'],
        required: [true, 'A userame is required']
    },
    password: {
      type: String,
      minlength: [6, 'The password must be at least 6 characters'],
      required: [true, 'A password is required']
    },
    name: {
      type: String,
      required: [true, 'A name is required']
    },
    posts: [{
      name: {
        type: String,
      },
      post: {
        type: String,
        maxlength: [255, 'Your post is too long'],
      },
    }],
    messages: {
      type: String,
    }
}, { timestamps: true });

module.exports = { 
	User: mongoose.model('User', UserSchema)
}