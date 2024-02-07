const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routersConfig = require('./config/routers');



async function start() {

    const app = express();

    expressConfig(app);
    routersConfig(app);
    await databaseConfig(app);

    app.listen(3000, () => console.log('Server listening on port 3000'));

}


start();



