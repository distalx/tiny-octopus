## Tiny Octopus




#### Prerequisites

  - node v8.x
  - mongodb v3.6.2

------


**Usage**

```
git clone git@github.com:distalx/tiny-octopus.git && cd tiny-octopus
npm install -g
npm link
```


```js
const TinyOctopus = require('tiny-octopus');

TinyOctopus(connection, {
  source_c: "users",
  destination_c: ['posts', 'comments'],
  source_f: "_id",
  destination_f: "author.id",
  fields: {
    'username': "author.username"
  }
});
```
