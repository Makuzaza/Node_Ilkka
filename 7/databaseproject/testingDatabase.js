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

// db.doQuery('select * from employee').then(console.log).catch(console.log).catch(console.log);

(async ()=>{
    try{
        const result = await db.doQuery('select * from employee');
    //    console.log(result);
    if(result.resultSet){
       for(const person of result.queryResult){
           console.log(`${person.firstname} ${person.lastname}`);
        }
      }
    //   const insertResult = await db.doQuery('insert into employee values (?,?,?,?,?)',[3,'Mary','Smith','admin',7000]);
    //     console.log(insertResult);
    const deleteResult = await db.doQuery('delete from employee where id=?',[3]);
        console.log(deleteResult);
    }
    catch(err){
        console.log(err);
    }
   
})();