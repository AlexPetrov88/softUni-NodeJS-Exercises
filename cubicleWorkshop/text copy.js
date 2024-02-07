//import express JS ->   
const express = require('express');

//import express-handlebars ->  
const hbr = require('express-handlebars');

//create extname to '.hbs' ->  
hbs.create({
    extname: '.hbs',
});

//app call to express functionality ->  
const app = express();

// set up handlebars app.engine ->
app.engine('.hbs', hbs.engine);

// set up handlebars app.set -> 
app.set('view engine', '.hbs');

//set up express body parser
app.use(express.urlencoded({ extended: true})); // extended ca be true or false

//set up express static folder with static files
app.use('/static', express.static('static'));


//listen to current port
app.listen(3000);