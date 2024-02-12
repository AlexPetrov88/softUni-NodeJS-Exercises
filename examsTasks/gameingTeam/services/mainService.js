const MainItem = require("../models/MainItem")


async function getAll() {
    return MainItem.find({}).lean();
}


async function getById(id) {
    return MainItem.findById(id).lean();
}


async function create(mainItem) {
    return await MainItem.create(mainItem);
}

// TODO change items
async function update(id, mainItem) {
    const existing = await MainItem.findById(id);

    existing.platform = mainItem.platform;
    existing.name = mainItem.name;
    existing.image = mainItem.image;
    existing.price = mainItem.price;
    existing.genre = mainItem.genre;
    existing.description = mainItem.description;
    await existing.save();
}


async function deleteById(id) {
    await MainItem.findByIdAndRemove(id);
}


async function bookRoom(hotelId, userId) {
    
    const mainItem = await MainItem.findById(hotelId);

    // if (mainItem.bookings.includes(userId)) {
    //     throw new Error('Cannot book twice');
    // }

    mainItem.bookings.push(userId);
    await mainItem.save();
}

async function getByUserBooking(userId) {
    return MainItem.find({ bookings: userId }).lean();
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