const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const mainSchema = new Schema({
    platform: { type: String, required: true, enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"] }, 
    name: { type: String, required: true, minlength: [4,'Name must at least 4 characters long'] }, 
    image: {
        type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image URL is not valid'
        }
    },
    price: { type: Number, required: true, min: [1, 'The price should be a positive number.']},
    genre: { type: String, required: true, minlength: [2,'The Genre should be at least 2 characters'] },
    description: { type: String, required: true, minlength: [10, 'The description should be a minimum of 10 characters long.'] },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] }, // boughtBy
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});


const MainItem = model('MainItem', mainSchema);

module.exports = MainItem;
