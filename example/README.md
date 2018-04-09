#### Prerequisites

  - node v8.x
  - mongodb v3.6.2



#### Quick Start

**Setup**

```
git clone https://github.com/distalx/tiny-octopus.git
cd tiny-octopus
npm install
cd example
```

Make sure that you have a mongodb replica set running on your machine.

here is a guide about how to setup a replica set. [Deploy a Replica Set](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)

You can configure your mongodb details at `example/config/db.js`

###### To see a database :

```
node seed.js
```

###### Run a server :

```
node index.js
```

----

Once you seeded your database and server up and running successfully. Try to modify the some documents from `users` or `tags` collection.

i.e. `db.users.update({'_id': '1'}, {$set:{ 'username': 'new_username'}})`

These will modify the username in `posts` and `comments` collections too.


###### To clear a database :

```
node unseed.js
```
