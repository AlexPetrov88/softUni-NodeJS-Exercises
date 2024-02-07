const fs = require('fs');

const dataFile = './models/database.json';
const data = JSON.parse(fs.readFileSync(dataFile));

async function persist() {
    return new Promise((resolver, reject) => {
        fs.writeFile(dataFile, JSON.stringify(data, null, 2), (err) => {
            if(err == null) {
                resolver();
            } else {
                reject(err);
            }
        })
    });
}
// city, search, fromPrice, toPrice
function getAll() {
    return data;
    // return data.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))
    //     .filter(r => r.city.toLowerCase().includes(city.toLowerCase ()))
    //     .filter(r => r.price >= fromPrice && r.price <= toPrice);
}

function getById(id) {
    return data.find((c) => c.id == id);
}

async function create(dataCube) {
    console.log(dataCube);
    const cube = {
        id: getId(),
        name: dataCube.name,
        description: dataCube.description,
        imgUrl: dataCube.imgUrl,
        difficultyLevel: dataCube.difficultyLevel
    }
    console.log(cube);
    data.push(cube);

    persist();
    return cube;
}

function getId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16).slice(-6));
}

module.exports = {
    getAll,
    getById,
    create
}