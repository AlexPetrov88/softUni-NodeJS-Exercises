const mongoose = require('mongoose');

const connectionStr = process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017/airBnb'

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('Database connected');
    } catch (error) {
        console.error ('Error initializing databse');
        console.error(error.message);
        process.exit(1);
    }
}