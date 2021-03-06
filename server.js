const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log');
    });
    next();
});

// app.use((req, res, next) => res.render('maintenance', {
//     pageTitle: 'Maintenance Page',
//     message: 'Sorry, we are under maintenance. Please try again later.'
// }));

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => res.render('home.hbs', 
    {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome back!'
    })
);

app.get('/about', (req, res) => res.render('about.hbs', 
    {
        pageTitle: 'About Page'
    })
);

app.get('/projects', (req, res) => 
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
);

app.get('/bad', (req, res) => 
    res.send({
        errorMessage: 'Unable to handle request'
    })
);

app.listen(PORT, () => console.log(`Server has started on ${ PORT }`));