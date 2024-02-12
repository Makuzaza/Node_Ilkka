import {updateMessage} from '/js/helpers.js';

document.addEventListener('DOMContentLoaded', init);

async function init(){
    try{
        const data = await fetch('/all');
        const employees=await data.json();

        const resultset=document.getElementById('resultset');
        for(const emp of employees){
            const tr=document.createElement('tr');
            tr.appendChild(createCell(emp.id));
            tr.appendChild(createCell(emp.firstname));
            tr.appendChild(createCell(emp.lastname));
            tr.appendChild(createCell(emp.department));
            tr.appendChild(createCell(emp.salary));
            resultset.appendChild(tr);
        }
    }
    catch(err){
        const element = document.getElementById('messagearea');
        updateMessage(element,'Error in transmission','error')
    }
}

function createCell(data){
    const td=document.createElement('td');
    td.textContent=data;
    return td;
}