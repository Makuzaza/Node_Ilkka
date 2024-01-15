'use strict';

const path = require('path');

const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';  

app.use(express.static(path.join(__dirname, 'public')));

const homePath = path.join(__dirname, 'home.html');
const pageBpath = path.join(__dirname, 'pageB.html');

app.get('/', (req, res) => res.sendFile(homePath));
app.get('/pageb', (req, res) => res.sendFile(pageBpath))

app.listen(port, host, () => console.log(`Server ${host}:${port} is serving...`));