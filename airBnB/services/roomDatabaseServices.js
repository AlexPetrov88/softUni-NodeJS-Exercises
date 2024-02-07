const Room = require('../models/RoomSchema');

function getAll(city, search, fromPrice, toPrice) {
    return Room.find({}).lean();
}

function getById(id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(dataRoom) {
        const room = {
            city: dataRoom.city,
            description: dataRoom.description,
            name: dataRoom.name,
            beds: Number(dataRoom.beds),
            price: Number(dataRoom.price),
            imgUrl: dataRoom.imgUrl
        }

        const missing = Object.entries (room).filter(([k, v]) => !v);
        if (missing.length > 0) {
            throw new Error (missing.map(m => `${m[0]} is required!`).join('In'));
        }
    
        const result = await Room.create(room);
        return result;

    }

module.exports = {
    getAll,
    getById,
    create
}



// const fs = require('fs');

// const dataFile = './models/data.json';
// const data = JSON.parse(fs.readFileSync(dataFile));

// async function persist() {
//     return new Promise((resolver, reject) => {
//         fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
//             if(err == null) {
//                 resolver();
//             } else {
//                 reject(err);
//             }
//         })
//     });
// }

// function getAll(city, search, fromPrice, toPrice) {
    
//     return data.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))
//         .filter(r => r.city.toLowerCase().includes(city.toLowerCase()))
//         .filter(r => r.price >= fromPrice && r.price <= toPrice);
    
//     // data.filter((r) => r.name.toLowerCase().includes(search.toLowerCase() || r.description.toLowerCase().includes(search.toLowerCase())));
//         // .filter((r) => r.city.toLowerCase().includes(city.toLowerCase())
//         // .filter((r) => r.price >= fromPrice && r.price <= toPrice));
// }

// // function getAll(city, search, fromPrice, toPrice) {
// //     return data.filter((r) => {
// //       // Check if the required properties exist and are not empty or null
// //       const validName = r.name && r.name.toLowerCase().includes(search.toLowerCase());
// //       const validDescription = r.description && r.description.toLowerCase().includes(search.toLowerCase());
// //       const validCity = r.city && r.city.toLowerCase().includes(city.toLowerCase());
// //       const validPrice = typeof r.price === 'number' && r.price >= fromPrice && r.price <= toPrice;
  
// //       // Include the room in the filtered results if all criteria are met
// //       return validName || validDescription && validCity && validPrice;
// //     });
// //   }

// function getById(id) {
//     return data.find((r) => r.id == id);
// }

// async function create(dataRoom) {
//     const room = {
//         id: getId(),
//         city: dataRoom.city,
//         description: dataRoom.description,
//         name: dataRoom.name,
//         beds: Number(dataRoom.beds),
//         price: Number(dataRoom.price),
//         imgUrl: dataRoom.imgUrl
//     }

//     data.push(room);

//     persist();
//     return room;
// }

// function getId() {
//     return ('000000' + (Math.random() * 999999 | 0).toString(16).slice(-6));
// }

// module.exports = {
//     getAll,
//     getById,
//     create
// }