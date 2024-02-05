'use strict';

(function(){
    let idField;
    let firstnameField;
    let lastnameField;
    let departmentField;
    let salaryField;

    let resultarea;

    let searchState = true;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        idField=document.getElementById('id');
        firstnameField=document.getElementById('firstname');
        lastnameField=document.getElementById('lastname');
        departmentField=document.getElementById('department');
        salaryField=document.getElementById('salary');

        resultarea=document.getElementById('resultarea');

        updateFieldsAccess();
        document.getElementById('submit').addEventListener('click', send);

        document.getElementById('clear').addEventListener('click', reset);

        idField.addEventListener('focus', clearAll);
    } // end of init

    function reset(){
        searchState = true;
            clearAll();
    } // end of reset
    
    function clearAll(){
        if  (searchState){
            idField.value='';
            firstnameField.value='';
            lastnameField.value='';
            departmentField.value='';
            salaryField.value='';
            resultarea.textContent='';
            resultarea.removeAttribute('class');
            updateFieldsAccess();
        }
     
    } // end of clearAll

    function updateFieldsAccess(){
        if(searchState){
            idField.removeAttribute('readonly');
            firstnameField.setAttribute('readonly',true);
            lastnameField.setAttribute('readonly',true);
            departmentField.setAttribute('readonly',true);
            salaryField.setAttribute('readonly',true);
        } else {
            idField.setAttribute('readonly',true);
            firstnameField.removeAttribute('readonly');
            lastnameField.removeAttribute('readonly');
            departmentField.removeAttribute('readonly');
            salaryField.removeAttribute('readonly');
        }
    } // end of updateFieldsAccess

    async function send(){
        const baseUri = 'http://localhost:4000/rest/employees';
        try {
            if(searchState){
                // get data
                const data = await fetch(`${baseUri}/id/${idField.value}`,{mode:'cors'});
                const result = await data.json();   
                if(result.length>0){
                    const person=result[0];
                    idField.value=person.id;
                    firstnameField.value=person.firstname;
                    lastnameField.value=person.lastname;
                    departmentField.value=person.department;
                    salaryField.value=person.salary;
                    searchState=false;
                    updateFieldsAccess();
                } else {
                    updateStatus({message:'Nothing found',type:'error'});
                }
            } else {
                // put data
                const person={
                    id:+idField.value,
                    firstname:firstnameField.value,
                    lastname:lastnameField.value,
                    department:departmentField.value,
                    salary:+salaryField.value
                }
                const options={
                    method:'PUT',
                    mode:'cors',
                    body:JSON.stringify(person),
                    headers:{'Content-Type':'application/json'}
                }
                const data = await fetch(`${baseUri}/${person.id}`, options);
                const result = await data.json();

                updateStatus(result);
                searchState=true;
                updateFieldsAccess();
            }
        }
        catch(error){
            updateStatus({message:error.message,type:'error'});
        }
    } // end of send

    function updateStatus(status){
        resultarea.textContent=status.message;
        resultarea.setAttribute('class', status.type);
    } // end of updateStatus
})();