'use strict';

const Database = require('./database');
const options = {
    host:'localhost',
    port: 3306, //select @@PORT
    user:'server',
    password:'1234',
    database:'employeedb',
    allowPublicKeyRetrieval:true
};

const db = new Database(options);

function printPersons(persons){
        for(const person of persons){
            console.log(`${person.id}: ${person.firstname} ${person.lastname}`+`, Dept: ${person.department}, ${person.salary} €`);
        }
}   

async function getAll(){
    try {
        const result = await db.doQuery('select * from employee');
        printPersons(result.queryResult);

    }
    catch(err){
        console.log(err);
    }
}

async function getOne(id){
    try {
        const result = await db.doQuery('select * from employee where id=?',[id]);
        
        if(result.queryResult.length>0){
            printPersons(result.queryResult);
        }
        else{
            console.log('No employee found with id: '+id);
        }
        
    }
    catch(err){
        console.log(err);
    }
}

async function add(employee){
    const sql = 'insert into employee values (?,?,?,?,?)';

    const parameters = [
        employee.id,
        employee.firstname,
        employee.lastname,
        employee.department,
        employee.salary
    ];

    try {
        const status = await db.doQuery(sql,parameters);
        console.log(status);
    }
    catch(err){
        console.log(err);
    }
}

async function remove(id){
    try {
        const status = await db.doQuery('delete from employee where id=?',[id]);
        console.log(status);
    }
    catch(err){
        console.log(err);
    }
}

async function update (employee){
    const sql = 'update employee set firstname=?, lastname=?, ' + 'department=?, salary=? where id=?';

    const parameters = [
        employee.firstname,
        employee.lastname,
        employee.department,
        employee.salary,
        employee.id
    ];

    try {
        const status = await db.doQuery(sql,parameters);
        console.log(status);
    }
    catch(err){
        console.log(err);
    }

}

async function main(){
    await getAll();
    console.log('#################');
    await getOne(2);
    console.log('#################');
    await getOne(5);
    console.log('#################');
    await add({
        id:3,
        firstname:'Mary',
        lastname:'Jones',
        department:'marketing',
        salary:4000});
    console.log('#################');
    await getAll();
    await update({
        id:3,
        firstname:'Mary',
        lastname:'Jonexs',
        department:'marketing',
        salary:4009});
    await getAll();
    console.log('#################');
    await remove(3);
    console.log('#################');
    await getAll();
    console.log('#################');
}

main();