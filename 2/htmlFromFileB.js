'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const {port, host} = require(path.join(__dirname, 'config.json'));
// const {port, host} = require('./config.json');

const homePath = path.join(__dirname, 'home.html');

const server = http.createServer((req,res)=>{
    sendFile(res, homePath);
});

server.listen(port, host, 
    ()=>console.log(`${host}:${port} serving...`));

async function sendFile(res, filePath){
    try{
        
        const data=await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type':'text/html',
            'Content-Length':Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch(err){
        res.statusCode=404;
        res.end(`Error: ${err.message}`);
    }
};


   
