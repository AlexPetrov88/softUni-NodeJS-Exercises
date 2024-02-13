const { Schema, model } = require('mongoose');


// TODO add user properties and validation
const userschema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'User name must be at least 3 characters'] }, 
    hashedPassword: { type: String, required: true }
});


userschema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userschema);

module.exports = User;