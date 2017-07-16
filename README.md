# Best fit User matching

A simple way to match users based on multiple attributes. In the real world I would make use of a library like [Match Sorter](https://www.npmjs.com/package/match-sorter).

## Demo
Take a look at the [demo](https://mrarlloyd.github.io/)

## Javascript

Open the `index.html` file in a browser & check the console for all matches. Could expand this using [Random User Generator](https://www.npmjs.com/package/random-user-generator)

## MongoDB

Something along these lines... would need some testing to optimize.

```javascript
    MongoUsersCollection.aggregate([
      { "$match": {[ "tags": { "$in": primaryUser.tags } }, "categories": { "$in": primaryUser.categories } } ]},
      { "$project": { "size": { "$size": { [{"$setIntersection": [ primaryUser.tags, "$tags" ]},{"$setIntersection": [ primaryUser.categories, "$categories" ]} ]} } }}, { "$sort": { "size": -1 } }, { "$limit": 1 }
    ])
```
