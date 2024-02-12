const { Schema, model } = require('mongoose');

// TODO add user properties and validation
const userschema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, minlength: [10,'The email should be at least 10 characters long'] },
    username: { 
        type: String,
        required: true,
        unique: true, 
        minlength: [4, 'The username should be at least 4 characters long'] }, 
        hashedPassword: { type: String, required: true } 
    });
    // match: [/^[a-zA-Z0-9]+$/i,'Username may contain only english letter and numbers'] },
    // match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/i, 'Email may contain only english letters and digits'] },


userschema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userschema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userschema);

module.exports = User;