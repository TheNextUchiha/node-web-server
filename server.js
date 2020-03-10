const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
//Handlebars Partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//Express Middle-wares
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

//Handlebars Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Request Handlers
app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Page!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'An error occured bruh'
    });
});

//App initialization at Express server on a specified port no.
app.listen(1234, () => {
    console.log('Server is up at port 1234');
});