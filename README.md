## Tiny Octopus

> This is a POC. DO NOT EVER USE IN PRODUCTION.

[![travis build](https://img.shields.io/travis/distalx/tiny-octopus.svg?style=flat-square)](https://travis-ci.org/distalx/tiny-octopus)
[![codecov coverage](https://img.shields.io/codecov/c/github/distalx/tiny-octopus.svg?style=flat-square)](https://codecov.io/github/distalx/tiny-octopus)
[![version](https://img.shields.io/npm/v/tiny-octopus.svg?style=flat-square)](http://npm.im/tiny-octopus)
[![downloads](https://img.shields.io/npm/dm/tiny-octopus.svg?style=flat-square)](http://npm-stat.com/charts.html?package=tiny-octopus&from=2016-08-10)
[![MIT License](https://img.shields.io/npm/l/tiny-octopus.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)


#### Prerequisites

  - node v8.x
  - mongodb v3.6.2

------


**Usage**

```
npm install tiny-octopus
```


```js
const TinyOctopus = require('tiny-octopus');

// Create a new stream.
TinyOctopus(connection, task);
```

###### ARGUMENTS



`connection` _Object_

Mongodb connection object

`task` _Object_

A task object typically includes `source collection`, `destination collections`, `source_field`, `destination field`, `fields`.

Very roughly:

```js
{
  source_c: "users",
  destination_c: ['posts', 'comments'],
  source_f: "_id",
  destination_f: "author.id",
  fields: {
    'username': "author.username"
  }
};
```


##### Ideal Scenario

It's best suited for Distributed Data Model

i.e. if there are collections like users, posts, comments and user's data is replicated over other collections.

```js
// users
{
  "_id": "1",
  "username": "prateek",
  "city": "Pune"
}
```

```js
// posts
{
  "_id": "1",
  "title": "Sarcasm is weird. Even not in acting, in life I feel like 'sarcastic' is a word that people use to describe me sometimes so when I meet someone, it's almost like they feel like they have to also be sarcastic, but it can sometimes just come off as mean if it's not used in the right way. ",
  "tags": [
    { "id": "1", "title": "News"},
    { "id": "2", "title": "Spots"}
  ],
  "author": {
    "id": "1",
    "username": "prateek"
  }
}
```


```js
// comments
{
  "_id": "1",
  "parent_id": "2",
  "text": "Sarcasm is like cheap wine - it leaves a terrible aftertaste.",
  "author": {
    "id": "1",
    "username": "prateek"
  }
}
```

###### example

```js
const MongoClient = require('mongodb').MongoClient;
const TinyOctopus = require('tiny-octopus');

MongoClient.connect(db_url, function(err, client) {
  const connection = client.db(db_name)
  TinyOctopus(connection, {
    source_c: "users",
    destination_c: ['posts', 'comments'],
    source_f: "_id",
    destination_f: "author.id",
    fields: {
      'username': "author.username"
    }
  });
});
```

This will replicate any changes made to the `users` collection's username field to `posts` and `comments` collections.

```js
db.users.update({ "_id": "1"}, {$set: {"username": "Karan"}});
```

---
For more details checkout the [example](https://github.com/distalx/tiny-octopus/tree/master/example) section.


---

###### Acknowledgements

Thanks to: @wawhal, @karthikvt26 for the feedback.
