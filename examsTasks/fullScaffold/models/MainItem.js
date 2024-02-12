const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const mainSchema = new Schema({
    name: { type: String, required: true, minlength: [2,'Title name must at least 2 characters long'] }, 
    years: { type: Number, required: true, min: [1, 'The years should be a positive number between 1 and 100'], max: [100, 'The years should be a positive number between 1 and 100']},
    kind: { type: String, required: true, minlength: [3,'Kind must at least 3 characters long'] }, 
    image: {
        type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image URL is not valid'
        }
    },
    needs: { type: String, required: true, min: [3,'should be at least 3 and no longer than 20 characters'], max: [20, 'should be at least 3 and no longer than 20 characters'] },
    location: { type: String, required: true, min: [5,'should be at least 3 and no longer than 20 characters'], max: [15, 'should be at least 3 and no longer than 20 characters'] },
    description: { type: String, required: true, min: [5,'should be at least 3 and no longer than 20 characters'], max: [50, 'should be at least 3 and no longer than 20 characters'] },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] }, // Donate
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});


const MainItem = model('MainItem', mainSchema);

module.exports = MainItem;
