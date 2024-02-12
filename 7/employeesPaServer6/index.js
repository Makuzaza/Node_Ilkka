import * as http from 'http';
import * as path from 'path';

import fetch from 'node-fetch';

//Define "require"
import { createRequire } from 'module';
const require=createRequire(import.meta.url);

const express = require('express');
const app = express();

const {port, host} = require('./config.json');

import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.',import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

const menuPath=path.join(__dirname,'menu.html');

app.get('/',(req,res)=>res.sendFile(menuPath));

app.get('/all', (req, res) =>
    fetch('http://localhost:4000/rest/employees')
    .then(data => data.json())
    .then(result => res.json(result))
);

app.post('/add', (req,res)=>{
    const employee=req.body;
    const options={
        method:'POST',
        body:JSON.stringify(employee),
        headers:{'Content-Type':'application/json'}
    };
    fetch('http://localhost:4000/rest/employees',options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(error=>res.send.json(error))
});

// app.post('/add', (req, res) => {
//     const employee = req.body;
//     const options = {
//         method: 'PUT',
//         body: JSON.stringify(employee),
//         headers: { 'Content-Type': 'application/json' }
//     };
//     fetch(`http://localhost:4000/rest/employees/${employee.id}`, options)
//         .then(data => data.json())
//         .then(result => res.json(result))
//         .catch(error => res.send.json(error))
// });







app.listen(port,host,
    ()=>console.log(`Spa server ${host}:${port} is serving`));
