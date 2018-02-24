const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const db = require('../config/db');

let state = {
  mc: null,
  db: null
}


function connect (callback) {


  return new Promise((resolve, reject) => {

    if (state.db) {
      return callback ? callback(null, state) : resolve(state)
    }

    MongoClient.connect(db.url, function(err, client) {
      if (err) {
        console.log(err);

        // if no callback available, reject the promise
        // else, return callback using "error-first-pattern"
        return callback ? callback(err) : reject(err)
      }

      state.mc = client;
      const database = client.db(db.name)
      state.db = database

      return callback ? callback(null, state) : resolve(state)

    });

  })
}

function get() {
  return state;
}

function close() {
  if (state.mc) {
    state.mc.close();
    state.mc = null
    state.db = null
  }
  console.log("Close");

}



module.exports = {
    connect,
    get,
    close
}
