const { hasUser } = require("../middlewares/guards");

const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const mainController = require("../controllers/mainController");
const detailsController = require("../controllers/detailsController");
const profileController = require("../controllers/profileController");
const searchController = require("../controllers/searchController");
const error404Controller =require('../controllers/error404Controller');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/mainItem', hasUser(), mainController);
    app.use('/details', detailsController);
    app.use('/profile', hasUser(), profileController);
    app.use('/search', searchController);
    app.all('error404Controller')
};