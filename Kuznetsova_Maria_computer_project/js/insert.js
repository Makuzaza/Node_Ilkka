'use strict';

(function(){

    let idField;
    let nameField;
    let typeField;
    let amountField;
    let processorField;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea=document.getElementById('resultarea');
        idField=document.getElementById('id');
        nameField=document.getElementById('name');
        typeField=document.getElementById('type');
        amountField=document.getElementById('amount');
        processorField=document.getElementById('processor');

        document.getElementById('submit').addEventListener('click', send);

        idField.addEventListener('focus', clear);

    }

    function clear(){
        idField.value='';
        nameField.value='';
        typeField.value='';
        amountField.value='';
        processorField.value='';
        resultarea.textContent='';
        resultarea.removeAttribute('class');
    }

    async function send(){
        const computer={
            id:+idField.value,
            name:nameField.value,
            type:typeField.value,
            amount:+amountField.value,
            processor:processorField.value
        };

        try{
            const options={
                method:'POST',
                body:JSON.stringify(computer),
                headers:{'Content-Type':'application/json'}
            };
            const data=await fetch('/addcomputer', options);
            const result=await data.json();

            updateStatus(result)

        }
        catch(err){
            updateStatus({message:err.message, type:'error'});
        }
    }

    function updateStatus(status){
        resultarea.textContent=status.message;
        resultarea.setAttribute('class', status.type);
    }
})();