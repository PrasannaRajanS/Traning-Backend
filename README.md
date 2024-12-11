# github
https://github.com/PrasannaRajanS

# Backend - Traning
Implement backend code with different variations.

## Development server
Run `npm start` to run the server using nodemon DB_URL=mongodb://127.0.0.1:27017/TrainingServer, PORT=5555

## Node Mailer using SMPT Method
EMAIL_USER=abc.school.mangement@gmail.com,  EMAIL_PASS=vbgeelvryhtkjfpe

## Build 
Model for schemas, Controller for aggregation Pipelines, routers for end point

#Index
// Sparse Compound Index
db.products.createIndex({ discount: 1 }, { sparse: true });

db.products.insertMany([
  { productId: 1, name: "Laptop", category: "Electronics", discount: 10 },
  { productId: 2, name: "Phone", category: "Electronics" },
  { productId: 3, name: "Shirt", category: "Clothing", discount: 5 },
  { productId: 4, name: "Shoes", category: "Clothing" }
]);

// Unique Compound Index
db.employees.createIndex({ email: 1, department: 1 }, { unique: true });

{
  name: "prasanna",
  age: "23",
  address: ["vadalure", "chennai"],
  hobbies: ["cricket", "basketball"]
}
What Happens If You Try to Index Both?

db.collection.createIndex({ address: 1, hobbies: 1 })
// Error: Cannot create index with multiple array fields
db.collection.createIndex({ address: 1 });
db.collection.createIndex({ hobbies: 1 });

// Text Index
db.posts.createIndex({ tags: 1, content: "text" });
db.posts.find({ tags: "technology", $text: { $search: "MongoDB" } });


