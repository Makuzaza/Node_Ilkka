# Database class

This database class is a general purpose class for creating and using Mariadb/Mysql database queries. Constructor takes all necessary information needed to open a database connection as parameter object.

Here is an example of option object for constructor:

```js
{
        host:'localhost',
        port: 3306, //select @@PORT
        user:'server',
        password:'1234',
        database:'employeedb',
        allowPublicKeyRetrieval:true
}
```

## Method **doQuery(sql, parameters)**

- sql is sql statement as a string
- parameters is an array of values to replace place holders (?) in sql statement

### Usage:

```js
const result = await db.doQuery("select * from employee where id=?", [2]);
```

Select queries will return a promise with a result javascript object:

```js
{
    queryResult:[
        {
    id:2,
    firstname:'Matt',
    lastname:'River',
    department:'ict',
    salary:5000
        }
    ],
    resultSet:true
}
```

Other than select will return a promise with an object:

```js
{
    queryResult:{
        rowsChanged:1,
        insertId:0,
        status:0
    },
    resultSet:false
}
```

In error case it reject error-string.
