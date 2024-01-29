'use strict';   

const path = require('path');   
const express = require('express'); 

const app = express();

const {
    port,
    host,
    storageEngine,
    storage
} = require('./config.json');
const { execPath } = require('process');
const { render } = require('ejs');

const storageEnginePath = path.join(__dirname, storageEngine.folder);

const dataStoragePath = path.join(storageEnginePath, storageEngine.dataStorageFile);

const storagePath = path.join(__dirname, storage.folder);

const {createDataStorage} = require(dataStoragePath);
const dataStorage = createDataStorage(storagePath, storage.storageConfigFile);

// dataStorage.getAll().then(console.log);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageViews'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));

const menuPath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/all', (req, res) => 
    dataStorage.getAll().then(data => res.render('allPersons', {
        title: 'Persons',
        header: 'All Persons',
        result:data
    })));

app.get('/search', (req, res) => dataStorage.KEYS.then(keys => res.render('search', {keys})));

app.post('/search', async (req,res)=>{
    if(!req.body) return res.sendStatus(500);
    const key = req.body.key;
    const value = req.body.searchvalue;
    const persons = await dataStorage.get(value, key);
    res.render('allPersons', {
        title: 'Search',
        header: `Found persons`,
        result: persons
    })
});

app.get('/inputform', (req, res) => res.render('form', {
    title:'Add person',
        header:'Add a new person',
        action:'/input',
        id:{value:'', readonly:'', label: 'Employee ID'},
        firstname:{value:'', readonly:''},
        lastname:{value:'', readonly:''},
        department:{value:'', readonly:''},
        salary:{value:'', readonly:''}
}));

app.post('/input', (req,res)=>{
    if(!req.body) return res.sendStatus(500);

    dataStorage.insert(req.body).then(state=>sendStatusPage(res,state)).catch(error=>sendErrorPage(res,error));
});

app.get('/removeperson', (req, res) => res.render('getPerson', {
    title: 'Remove',
    header: 'Remove person data',
    action: '/removeperson'
}));

app.post('/removeperson', (req,res)=>{
    if(!req.body) return res.sendStatus(500);
   const personId = req.body.id;
    dataStorage.remove(personId)
    .then(state=>sendStatusPage(res,state))
    .catch(error=>sendErrorPage(res,error));
});

app.get('/updateform', (req, res) => res.render('form', {
    title: 'Update employee',
    header: 'Update employee data',
    action: '/getupdatedata',
    id: {value: '', readonly: ''},
    firstname: {value: '', readonly: 'readonly'},
    lastname: {value: '', readonly: 'readonly'},
    department: {value: '', readonly: 'readonly'},
    salary: {value: '', readonly: 'readonly'}
   
}));

app.post('/getupdatedata', async (req,res)=>{
    if(!req.body) return res.sendStatus(500);
    const result = await dataStorage.get(req.body.id);
    if(result.length>0){
        const person = result[0];
        res.render('form', {
            title: 'Update employee',
            header: 'Update employee data',
            action: '/updateperson',
            id: {value: person.id, readonly: 'readonly'},
            firstname: {value: person.firstname, readonly: ''},
            lastname: {value: person.lastname, readonly: ''},
            department: {value: person.department, readonly: ''},
            salary: {value: person.salary, readonly: ''}
        })
      
    } else {
        const id = req.body.id ? req.body.id : '--empty--';
        sendErrorPage(res, {
        message:`Nothing found with ID ${id}`, 
        type:dataStorage.TYPES.ERROR
    })
}

app.post('/updateperson', (req,res)=>{
    if(!req.body) return res.sendStatus(500);
    dataStorage.update(req.body)
    .then(state=>sendStatusPage(res,state))
    .catch(error=>sendErrorPage(res,error));
});
});

app.listen(port, host, () => console.log(`${host}:${port} serving ...`));

function sendStatusPage(res, status, title='Status', header='Status'){
    return res.render('statusPage', {title, header, status});
}

function sendErrorPage(res, error, title='Error', header='Error'){
   sendStatusPage(res, error, title, header);
}