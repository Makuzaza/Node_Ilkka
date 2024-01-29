# REST server

## Methods
- GET
- POST
- PUT
- DElETE

- OPTIONS
- HEAD

- PATCH
- TRACE
- CONNECT

## Resource

for example all computers:

http://localhost:4000/rest/computers

resource name is computers

for example computer number 1:

http://localhost:4000/rest/computers/1

to GET all computers 

GET /rest/computers

returns all computers as a json array (or some other format)

to GET one computer (number 1 for example)

GET /rest/computers/1

```json
{
    "id":1,
    "name":"Cera 2400"
}
```

To remove computer number one 

DELETE /rest/computers/1

To add a new computer 

POST /rest/computers/

the data to be posted is in requests body

To update or add

PUT /rest/computers/1

the data to be posted is in requests body
If the computer with given number doesn't exist, it will be added.
If exists then it is updated.

# Browser side javascript and fetch

Let's assume `cors` situation:

## GET 

```js
const option = {
    method:'GET',
    mode:'cors'
}
```

We use these from async function.

const serverPath='http://localhost:4000/rest/computers';

const data = await fetch(`${serverPath}/1`, option);
const compNumber1 = await data.json();

const data = await fetch(`${serverPath}/1`, {mode:'cors'}); // GET is default
const compNumber1 = await data.json();

## DELETE

```js
const option = {
    method:'DELETE',
    mode:'cors'
}
```
const data = await fetch(`${serverPath}/1`, option);
const status = await data.json();

## POST and PUT

```js
const newComp = {
    "id":1,
    "name":"Cera 2400"
}
```

```js
const option = {
    method:'POST',
    mode:'cors',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(newComp)
}
```

const data = await fetch(serverPath, option);

### PUT

```js
const option = {
    method:'PUT',
    mode:'cors',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(newComp)
}
```

const data = await fetch(`${serverPath}/10`, option);