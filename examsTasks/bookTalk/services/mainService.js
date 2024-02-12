const Book = require("../models/Book")


async function getAll() {
    return Book.find({}).lean();
}


async function getById(id) {
    return Book.findById(id).lean();
}


async function create(mainItem) {
    return await Book.create(mainItem);
}

// DOTO change items
async function update(id, mainItem) {
    const existing = await Book.findById(id);
    existing.title = mainItem.title;
    existing.author = mainItem.author;
    existing.genre = mainItem.genre;
    existing.stars = mainItem.stars;
    existing.image = mainItem.image;
    existing.review = mainItem.review;
    await existing.save();
}


async function deleteById(id) {
    await Book.findByIdAndRemove(id);
}


async function bookRoom(hotelId, userId) {
    
    const mainItem = await Book.findById(hotelId);

    // if (mainItem.bookings.includes(userId)) {
    //     throw new Error('Cannot book twice');
    // }

    mainItem.bookings.push(userId);
    await mainItem.save();
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