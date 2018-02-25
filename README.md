## Tiny Octopus

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
