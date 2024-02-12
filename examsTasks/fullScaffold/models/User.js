const { Schema, model } = require('mongoose');

const userschema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, minlength: [10,'The email should be at least 10 characters long'] },
        hashedPassword: { type: String, required: true } 
    });


userschema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userschema);

module.exports = User;