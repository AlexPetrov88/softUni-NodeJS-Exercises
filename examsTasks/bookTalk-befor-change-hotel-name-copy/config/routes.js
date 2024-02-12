const { hasUser } = require("../middlewares/guards");

const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const hotelController = require("../controllers/hotelController");
const detailsController = require("../controllers/detailsController");
const profileController = require("../controllers/profileController");
const error404Controller =require('../controllers/error404Controller');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotel', hasUser(), hotelController);
    app.use('/details', detailsController);
    app.use('/profile', profileController);
    app.all('error404Controller')
};