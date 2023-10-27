'use strict';

const http = require('http');

const port = 3000;
const host = 'localhost'; //'127.0.0.1'

const server = http.createServer((request, response)=>{
    response.writeHead(200,{
        'Content-Type':'text/plain;charset=utf-8'
    });
    response.write('<h1>Hello</h1>');
    response.end();
});

server.listen(port,host,
    ()=>console.log(`Server ${host} is serving at port ${port}`)
);

// server.listen(port);
