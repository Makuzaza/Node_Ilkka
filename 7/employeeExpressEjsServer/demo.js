const data = 
[
    {
      "id": 1,
      "firstname": "Leila",
      "lastname": "Hökki",
      "department": "ict",
      "salary": 4000
    },
    {
      "id": 2,
      "firstname": "Matt",
      "lastname": "River",
      "department": "ict",
      "salary": 4000
    },
    {
      "id": 3,
      "firstname": "Mary",
      "lastname": "River",
      "department": "ict",
      "salary": 5000
    }
  ]

const ids = data.map(item=>item.id);
console.log(ids);

const nextId = Math.max(...ids)+1;
console.log(nextId);

console.log(Math.max(...data.map(item=>item.id))+1);