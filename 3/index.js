'use strict';

const http = require('http');
const path = require('path');

const {port,host} = require('./config.json');

const {sendFile} = require('./functionLibrary');
const {search} = require('./datalayer');

const homePath=path.join(__dirname, 'home.html');

const server = http.createServer((req,res)=>{
    const{
        pathname,
        searchParams
    } = new URL(`http://${req.headers.host}${req.url}`);

    const route = decodeURIComponent(pathname);

    // console.log(req.method);
    
    if (route==='/') {
        sendFile(res,homePath);
    } else if (route.startsWith('/styles/')) {
        sendFile(res,path.join(__dirname,route), 'text/css');
    } else if (route.startsWith('/js/')) {
        sendFile(res, path.join(__dirname,route), 'text/javascript');
    } else {
        let result=[];
        if(route==='/persons'){
            result=search();
        }
        else if(searchParams.has('value')){
            const value=searchParams.get('value');
            if (route==='/persons/firstname'){
                result=search('firstname', value);
            } else if(route==='/persons/lastname'){
                result=search('lastname', value);
            } else if(route==='/persons/age'){
                result=search('age', value);
            }
        }
        else {
            {message:'Key not found'}
        }
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(result));
    } // end of outer end
});

server.listen(port,host,
    ()=> console.log(`${host}:${port} serving ...`))