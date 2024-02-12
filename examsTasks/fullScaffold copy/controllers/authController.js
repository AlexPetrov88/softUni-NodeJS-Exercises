const validator = require('validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const authController = require('express').Router();

authController.get ('/register', (req, res) => {
    // TODO replace
    res.render ('register', {
        title: 'Register Page'
    });
});


authController.post('/register', async (req, res) => {
    try {
        // if(validator.isEmail(req.body.email) == false) {
        //     throw new Error('Invalid Email');
        // }

        // TODO change error text
        if(req.body.username == '' || req.body.password == "") {
            throw new Error('All fields are required');
        }

        if (req.body.password.length < 3) {
            throw new Error('Passwords must be at least 3 characters long');
        }

        if(req.body.password != req.body.repass) {
            throw new Error ('Passwords don\'t match');
        }
        const token = await register(req.body.email, req.body.username, req.body.password);
        // TODO check assignment to see if register create session
        res.cookie('token', token);    
        res.redirect('/'); //TODO redirect to assignment

    } catch(error) {

        const errors = parseError(error);

         // TODO add error display
        res.render('register', {
            title: 'Register Page', 
            errors,
            body: {
                email: req.body.email,
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (reg, res) => {

    res.render ('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {
    try {

        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token); 
        res.redirect('/');// TODO replace with redirect by assignment

    } catch (error) {

        const errors = parseError(error);
        // TODO add error display
        res.render ('login', {
            title: 'Login Page',
            errors,
            body: {
                email: req.body.email
            }
        });

    }

});

authController.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.redirect('/');// TODO replace with redirect by assignment

});

module.exports = authController;