'use strict';

const mariadb = require('mariadb');

module.exports = class Database{

    constructor(options){
        this.options=options;
    } //end of constructor

    doQuery(sql, parameters){
        return new Promise(async (resolve,reject)=>{
            let connection;
            try{
                connection=await mariadb.createConnection(this.options);
                const queryResult=await connection.query(sql,parameters);
                if(typeof queryResult === 'undefined'){
                    reject('QueryError');
                }
                else if(typeof queryResult.affectedRows === 'undefined'){
                    resolve({queryResult, resultSet:true});
                }
                else{
                    resolve({
                        queryResult:{
                            rowsChanged:queryResult.affectedRows,
                            insertId:queryResult.insertId,
                            status:queryResult.warningStatus
                        },
                        resultSet:false
                    });
                }
            }
            catch(error){
                reject('SQL-error: '+error);
            }
            finally{
                if(connection) connection.end();
            }
        });

    } //end of doQuery

} //end of the class