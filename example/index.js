const http = require('http')
const db = require('./plugins/database');
const users_task = require('./tasks/users');
const tags_task = require('./tasks/tags');
const TinyOctopus = require('../src');


const port = 3000

const findDocuments = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('posts');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    if (err) {
      callback(err);
    }
    callback(docs);
  });
}


const requestHandler = (request, response) => {

  db.connect()
    .then((result) =>{

      // Magic
      TinyOctopus(result, users_task);
      TinyOctopus(result, tags_task);
      // Magic Ends

      // List all posts
      findDocuments(result.db, function(result) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(result, null, 2))
        response.end();
      })

    })
    .catch((error)=>{
      // console.log(error);
      response.statusCode = 401;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ "err": "Unable to connect to Mongo." }, null, '\t'))
      response.end();
      process.exit(1)
    });



}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    db.close();
    process.exit();
});
