import { updateMessage, clearMessage } from '/js/helpers.js';

let idField;
let firstnameField;
let lastnameField;
let departmentField;
let salaryField;
let messagearea;

document.addEventListener('DOMContentLoaded', init);

function init(){
    idField=document.getElementById('id');
    firstnameField=document.getElementById('firstname');
    lastnameField=document.getElementById('lastname');
    departmentField=document.getElementById('department');
    salaryField=document.getElementById('salary');
    messagearea=document.getElementById('messagearea');

    document.getElementById('submit').addEventListener('click',send);

    idField.addEventListener('focus',clearAll);
}

function clearAll(){
    clearMessage(messagearea);
    idField.value='';
    firstnameField.value='';
    lastnameField.value='';
    departmentField.value='';
    salaryField.value='';
}

async function send(){
    clearMessage(messagearea);
    const employee={
        id:idField.value,
        firstname:firstnameField.value,
        lastname:lastnameField.value,
        department:departmentField.value,
        salary:salaryField.value
    };

    try{
        const options={
            method:'POST',
            body:JSON.stringify(employee),
            headers:{'Content-Type':'application/json'}
        }

        const data = await fetch('/add',options);
        const status=await data.json();
        if(status.message){
            updateMessage(messagearea,status.message,status.type);
        }
    }
    catch(err){
        updateMessage(messagearea,error.message,'error');
    }

}