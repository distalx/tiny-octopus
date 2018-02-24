const db = require('./config/db');
const MongoClient = require('mongodb').MongoClient;
let client = null;
// Connect using MongoClient
MongoClient.connect(db.url, function(err, client) {
  client = client;
  const database = client.db(db.name)
  const books = database.collection("books");
  const authors = database.collection("authors");
  const posts = database.collection("posts");
  const users = database.collection("users");
  const tags = database.collection("tags");
  const comments = database.collection("comments");

  Promise.all([
    books.deleteMany(),
    authors.deleteMany(),
    posts.deleteMany(),
    users.deleteMany(),
    tags.deleteMany(),
    comments.deleteMany(),
  ])
  .then(([result1, result2, result3, result4, result5, result6]) => {
    console.log(`Remove ${result1}`);
    console.log(`Remove ${result2}`);
    console.log(`Remove ${result3}`);
    console.log(`Remove ${result4}`);
    console.log(`Remove ${result5}`);
    console.log(`Remove ${result6}`);
    client.close();
    process.exit();

  })
  .catch(error => {
    console.log(`error ${error}`);
    client.close();
    process.exit();
  });

});
