'use strict';

const path = require('path');

const { CODES, TYPES, MESSAGES } = require('./statusCodes');
const Database = require('./database');

function createDataStorage(storagePath, storageConfig){

    const config=require(path.join(storagePath,storageConfig));
    const sql = require(path.join(storagePath, config.sqlStatements));
    const { 
        insertParameters, 
        updateParameters 
    } = require(path.join(storagePath, config.parameterFunctionsFile));

    const getAllSql=sql.getAll.join(' ');
    const getOneSql = sql.getOne.join(' ');
    const insertSql = sql.insert.join(' ');
    const updateSql = sql.update.join(' ');
    const removeSql = sql.remove.join(' ');
    const search = sql.search;

    const primary_key=sql.primary_key;

    // console.log(getAllSql);
    // console.log(getOneSql);
    // console.log(insertSql);

    //Datastorage class

    class Datastorage{

        constructor(){
            this.db=new Database(config.options);
        }

        get CODES(){
            return CODES;
        }

        get TYPES(){
            return TYPES;
        }

        get PRIMARY_KEY(){
            return primary_key;
        }

        get KEYS(){
            return Promise.resolve(Object.keys(search));
        }

        get NEXT_FREE_KEY(){
            return getNextFreeKey();
        }

        get MESSAGES(){
            return MESSAGES;
        }

        get RESOURCE(){
            return config.resource;
        }

        getAll(){
           return new Promise(async (resolve,reject)=>{
                try{
                    const result = await this.db.doQuery(getAllSql);
                    resolve(result.queryResult);
                }
                catch(err){
                    reject(MESSAGES.PROGRAM_ERROR());
                }
           });
        }

        getOne(value){
            return new Promise(async (resolve,reject)=>{
                try{
                    if(value==undefined){
                        reject(MESSAGES.NOT_FOUND(primary_key,'--- empty ---'));
                    }
                    else{
                        const result=await this.db.doQuery(getOneSql,[value]);
                        if(result.queryResult.length>0){
                            resolve(result.queryResult[0]);
                        }
                        else{
                            resolve(MESSAGES.NOT_FOUND(primary_key,value));
                        }
                    }
                }
                catch(err){
                    console.log(err);
                    reject(MESSAGES.PROGRAM_ERROR());
                }
            })
        }

        // get(value, key=primary_key){
            
        // }

        // insert(item){
        //     return new Promise(async (resolve,reject)=>{
        //         if(item){
        //             if(!item[primary_key]){
        //                 reject(MESSAGES.NOT_INSERTED());
        //             }
        //             else if((await getFromStorage(item[primary_key])).length>0){
        //                 reject(MESSAGES.ALREADY_IN_USE(item[primary_key]));
        //             }
        //             else if(await addToStorage(item)){
        //                 resolve(MESSAGES.INSERT_OK(primary_key, item[primary_key]));
        //             }
        //             else{
        //                 reject(MESSAGES.NOT_INSERTED());
        //             }
        //         }
        //         else{
        //             reject(MESSAGES.NOT_INSERTED());
        //         }
        //     });
        // } //end of insert

        // update(item){
        //     return new Promise(async (resolve,reject)=>{
        //         if(item){
        //             if(await updateStorage(item)){
        //                 resolve(MESSAGES.UPDATE_OK(primary_key, item[primary_key]));
        //             }
        //             else{
        //                 reject(MESSAGES.NOT_UPDATED());
        //             }
        //         }
        //         else{
        //             reject(MESSAGES.NOT_UPDATED());
        //         }
        //     })
        // } //end of update

        // remove(value){
        //     return new Promise(async (resolve,reject)=>{
        //         if(!value){
        //             reject(MESSAGES.NOT_FOUND(primary_key,'--empty--'))
        //         }
        //         else if(await removeFromStorage(value)){
        //             resolve(MESSAGES.REMOVE_OK(primary_key,value));
        //         }
        //         else {
        //             reject(MESSAGES.NOT_REMOVED(primary_key,value))
        //         }
        //     });
        // } //end of remove
    } //end of class

    return new Datastorage();

} //end of function createDataStorage

module.exports = { createDataStorage }