const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const hotelSchema = new Schema({
    title: { type: String, required: true, minlength: [2,'Title name must at least 2 characters long'] }, 
    author: { type: String, required: true, minlength: [5,'Author name must at least 5 characters long'] }, 
    genre: { type: String, required: true, minlength: [3,'The Genre should be at least 3 characters'] },
    stars: { type: Number, required: true, min: [1, 'The Stars should be a positive number between 1 and 5'], max: [5, 'The Stars should be a positive number between 1 and 5']},
    image: {
        type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image URL is not valid'
        }
    },
    review: { type: String, required: true, minlength: [10, 'The Review should be a minimum of 10 characters long.'] },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] }, // WishingList
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});


const Book = model('Book', hotelSchema);

module.exports = Book;
