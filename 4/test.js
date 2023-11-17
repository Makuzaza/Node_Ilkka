'use strict';

const {read}=require('./libraryForRequest');

read('test.js').then(console.log).catch(console.log);
// read('test.png').then(console.log).catch(console.log);