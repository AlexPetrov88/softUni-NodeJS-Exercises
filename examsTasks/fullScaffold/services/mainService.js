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


async function update(id, mainItem) {
    const existing = await MainItem.findById(id);
    existing.name = mainItem.name;
    existing.years = mainItem.years;
    existing.kind = mainItem.kind;
    existing.image = mainItem.image;
    existing.needs = mainItem.needs;
    existing.location = mainItem.location;
    existing.description = mainItem.description;
    await existing.save();
}


async function deleteById(id) {
    await MainItem.findByIdAndRemove(id);
}


async function donate(itemId, userId) {
    
    const mainItem = await MainItem.findById(itemId);

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
    donate,
    getByUserBooking
}