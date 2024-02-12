'use strict';

const mariadb = require('mariadb');

async function test(){
    const options = {
        host:'localhost',
        port:3306, //select @@PORT
        user:'server',
        password:'1234',
        database:'employeedb',
        allowPublicKeyRetrieval:true
    };

    const connection = await mariadb.createConnection(options);

    const result = await connection.query('select * from employee');
    console.log(result);

    console.log('################# test 2 #################');
    const result2 = await connection.query('select firstname from employee where id=?',[1]);
    console.log(result2);

    // console.log('################# insert test #################');
    // const result3 = await connection.query('insert into employee values (?,?,?,?,?)',[4,'Mary','Smith','admin',7000]);
    // console.log(result3);

    console.log('################# update test #################');
    const result4 = await connection.query('update employee set salary=? where id=?',[5000,3]);
    console.log(result4);

    console.log('################# delete test #################');
    const result5 = await connection.query('delete from employee where id=?',[4]);
    console.log(result5);

    console.log('################# 2D array #################');
    const result6 = await connection.query({
        rowsAsArray:true,
        sql:'select * from employee'
    });
    console.log(result6);
    console.log(result.meta);

    // close the connection

    connection.end();
}

test();