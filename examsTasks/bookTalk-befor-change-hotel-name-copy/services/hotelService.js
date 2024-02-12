const Book = require("../models/Book")


async function getAll() {
    return Book.find({}).lean();
}


async function getById(id) {
    return Book.findById(id).lean();
}


async function create(hotel) {
    return await Book.create(hotel);
}

// DOTO change items
async function update(id, hotel) {
    const existing = await Book.findById(id);
    existing.title = hotel.title;
    existing.author = hotel.author;
    existing.genre = hotel.genre;
    existing.stars = hotel.stars;
    existing.image = hotel.image;
    existing.review = hotel.review;
    await existing.save();
}


async function deleteById(id) {
    await Book.findByIdAndRemove(id);
}


async function bookRoom(hotelId, userId) {
    
    const hotel = await Book.findById(hotelId);

    // if (hotel.bookings.includes(userId)) {
    //     throw new Error('Cannot book twice');
    // }

    hotel.bookings.push(userId);
    await hotel.save();
}

async function getByUserBooking(userId) {
    return Book.find({ bookings: userId }).lean();
}

module. exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom,
    getByUserBooking
}