const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const mainSchema = new Schema({
    name: { type: String, required: true, minlength: [2,'Title name must at least 2 characters long'] }, 
    image: {
        type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image URL is not valid'
        }
    },
    price: { type: Number, required: true, min: [1, 'The price should be a positive number'] },
    description: { type: String, required: true, minlength: [10, 'The Review should be a minimum of 10 characters long.'] },
    payment: { type: String, required: true, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'] }, 
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] }, // Buy a crypto
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});


const MainItem = model('MainItem', mainSchema);

module.exports = MainItem;
