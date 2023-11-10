'use strict';

const person =   {
    "firstname":"Matt", 
    "lastname":"River", 
    "age":30
};

console.log(person.firstname);
console.log(person['firstname']);
let key='firstname';
console.log(person[key]);
key = 'lastname';
console.log(person[key]);

function search(key){
    console.log(person[key]);
}

search('age');