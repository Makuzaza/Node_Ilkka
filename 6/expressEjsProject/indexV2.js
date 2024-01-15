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

app.listen(port, host, () => console.log(`${host}:${port} serving...`));