'use strict';

const path = require('path');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageTemplates'));

const {port,host} = require('./config.json');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));

const homePath = path.join(__dirname, 'home.html');
const users={
    matt: "secret",
    vera: "12345",
    jesse: "xyz"
}

app.get('/', (req, res) => res.sendFile(homePath));

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if(Object.keys(users).includes(username) && users[username] === password){
    res.render('result', {
        title: "your data",
        header: "You send these",
        data: {username, password}
    });
    } else {
        res.render('errorPage', {username})
    }

    
});

app.get('/users', (req, res) => res.render('users', {
    title: "Users",
    header: "Names",
    usernames:Object.keys(users)

}));

app.get('/cars', (req, res) => {
    const cars = [
        {model: 'Fast GT', licence: 'ABC-1'},
        {model: 'Errare', licence: 'XYZ-123'},
        {model: 'Fast GT', licence: 'HI-1'},
        {model: 'MbW', licence: 'A-1'}
    ];
    res.render('tabledemo', {cars});
});

app.get('/carsif', (req, res) => {
    const cars = [
        {model: 'Fast GT', licence: 'ABC-1'},
        {model: 'Errare', licence: 'XYZ-123'},
        {model: 'Fast GT', licence: 'HI-1'},
        {model: 'MbW', licence: 'A-1'}
    ];
    res.render('tabledemoif', {cars});
});

app.listen(port, host, () => console.log(`${host}:${port} serving...`));