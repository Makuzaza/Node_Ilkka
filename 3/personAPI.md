# Person API

## persons.json

```json
[
  { "firstname": "Matt", "lastname": "River", "age": 30 },
  { "firstname": "Jesse", "lastname": "River", "age": 10 },
  { "firstname": "Mary", "lastname": "Smith", "age": 50 }
]
```

## Datalayer for persons

### function **search**

Function returns person objects in an array. Search criterion is passed as parameters. If all parameters are missing, all persons will be returned. If there is no match, then an empty array is returned.

- search() returns all persons in an array
- search(key, value) returns all matching persons in an array

Example

```js
const result = search("firstname", "River");
const age = search("age", 30);
```

## Usage

### search all persons

http://localhost:3000/persons

### search by firstname

http://localhost:3000/persons/firstname?value=Matt

### search by lastname

http://localhost:3000/persons/persons/lastname?value=River

### search by age

http://localhost:3000/persons/age?value=30
