'use strict';

const http=require('http');
const path=require('path');

const { sendFile } = require('./functionLibrary');

const {port, host} = require('./config.json');

const formPath = path.join(__dirname, 'form.html');

const server = http.createServer(async (req, res) => {
    const method=req.method.toUpperCase();
    if (method==='GET') {
        sendFile(res, formPath);
    } else if (method === 'POST') {
        const formData=await getRequestPostBodyData(req);
        res.writeHead(200, {
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify(formData));
    }
});

server.listen(port, host, 
    () => console.log(`${host}:${port} serving...`));

function getRequestPostBodyData(request) {
    return new Promise((resolve, reject) => {
        if (request.headers['content-type']!=
        'application/x-www-form-urlencoded') { 
            reject('Wrong Content-Type');
        } else {
            const databuffer=[];
            request.on('data', datapart=>databuffer.push(datapart));
            request.on('end', ()=>{
                const params=new URLSearchParams(Buffer.concat(databuffer).toString());
                const jsonResult={};
                params.forEach((value,key)=>jsonResult[key]=value);
                resolve(jsonResult);
            });
            request.on('error', ()=>reject('Error in transmission'));
        }
    })
};