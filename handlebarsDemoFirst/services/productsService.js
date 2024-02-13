const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./services/data.json'));

function getListOfData() {
    return data;
}

function getProductById(id) {
    return data.find((p) => p.id === id);

}

async function create(name, price) {
    const id = 'asdf' + ('0000' + (Math.random() * 99999 | 0)).slice(-4);
    data.push({
        id,
        name,
        price
    });

    await persist();
}

async function deleteById(id) {

    const index = data.findIndex((p) => p.id == id);
    console.log(index);
    data.splice(index, 1);

    await persist();
}

function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            './services/data.json', 
            JSON.stringify(data, null, 2), 
            (error) => {
                if(error == null) {
                    resolve();
                } else {
                    reject(error);
                }
        });
    });
}

module.exports = {
    getListOfData,
    getProductById,
    create,
    deleteById
}