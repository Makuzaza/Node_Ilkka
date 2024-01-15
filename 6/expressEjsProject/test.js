const users = {
    matt: "secret",
    vera: "12345",
    jesse: "xyz"
};  

console.log(users.matt);
console.log(users["matt"]);

let u="matt";
console.log(users[u]);
u="jesse";
console.log(users[u]);
console.log(users.u);

console.log(Object.keys(users));