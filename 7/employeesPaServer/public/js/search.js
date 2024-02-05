'use strict';

(function(){

    let keylist;
    let resultarea;
    let searchvalue;

    document.addEventListener('DOMContentLoaded', init);
    
    async function init(){
        keylist=document.getElementById('keylist');
        resultarea=document.getElementById('resultarea');
        searchvalue=document.getElementById('searchvalue');

        try {
            const data=await fetch('http://localhost:4000/rest/employees/keys');
            if(data.ok){
                const keys = await data.json();
                if(keys.length>0){
                    populateList(keys)
                } else {
                    showErrorMessage('search not available');
                }
            }
            else{
                showErrorMessage('failed communication')
            }

        }
        catch(err) {
            showErrorMessage(err.message);
        }    
}
function populateList(keynames){
    for(const field of keynames){
        const option=document.createElement('option');
        option.value=field;
        option.textContent=field;
        keylist.appendChild(option);
    }

    keylist.value=keynames[0];

    document.getElementById('submit').addEventListener('click',send);
} // end of populateList

async function send(){
    const keyName=keylist.value;
    const value=searchvalue.value;
    try{
        
        const data=await fetch(`http://localhost:4000/rest/employees/${keyName}/${value}`,{mode:'cors'});
        const result=await data.json();

        updatePage(result);
    }
    catch(err){
        showErrorMessage(err.message);

    }

}

function updatePage(data){
    if(!data){
        showErrorMessage('Programming error!');
    }
    else if(data.length===0){
        showErrorMessage('Nothing found');
    }
    else{
        const htmlString=data.map(item=>createPerson(item)).join(' ');
        resultarea.innerHTML=htmlString;

    }
}

function createPerson(person){
    return `<div class="person">
    <p>id: ${person.id}</p>
    <p>First name: ${person.firstname}</p>
    <p>Last name: ${person.lastname}</p>
    <p>Department: ${person.department}</p>
    <p>Salary: ${person.salary}</p>
    <div/>`
}
function showErrorMessage(message){
    resultarea.innerHTML=`<p>${message}<p>`;
}

})();