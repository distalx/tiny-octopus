const fs = require('fs');
const post_list = JSON.parse(fs.readFileSync('./data/blog/posts.json', 'utf-8'));
const user_list = JSON.parse(fs.readFileSync('./data/blog/users.json', 'utf-8'));
const comment_list = JSON.parse(fs.readFileSync('./data/blog/comments.json', 'utf-8'));
const tag_list = JSON.parse(fs.readFileSync('./data/blog/tags.json', 'utf-8'));
const book_list = JSON.parse(fs.readFileSync('./data/books/books.json', 'utf-8'));
const author_list = JSON.parse(fs.readFileSync('./data/books/authors.json', 'utf-8'));
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

  books.find().count().then((result) => {

    if (result == 0) {

      console.log(`Number of books found ${result}`);

      return Promise.all([
        books.insertMany(book_list),
        authors.insertMany(author_list),
        posts.insertMany(post_list),
        users.insertMany(user_list),
        tags.insertMany(tag_list),
        comments.insertMany(comment_list),
      ])

    }else {
      client.close()
      console.log(`Number of books found ${result}`);
      process.exit();

    }

  })
  .then(([result1, result2, result3, result4, result5, result6]) => {

    console.log(`Insert ${JSON.stringify(result1.result, null, 2)}`);
    console.log(`Insert ${JSON.stringify(result2.result, null, 2)}`);
    console.log(`Insert ${JSON.stringify(result3.result, null, 2)}`);
    console.log(`Insert ${JSON.stringify(result4.result, null, 2)}`);
    console.log(`Insert ${JSON.stringify(result5.result, null, 2)}`);
    console.log(`Insert ${JSON.stringify(result6.result, null, 2)}`);

    client.close();
    process.exit();

  })
  .catch(err => {
    console.log(`error ${error}`);
    client.close();
    process.exit();
  });

});


process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    if (client) {
      client.close()
    }
    process.exit();
});
