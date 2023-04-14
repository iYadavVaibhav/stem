---
date: 2016-04-12
---

# Mongo DB

*all about no sql mongo-db, notes from certification prepration*

## Setup

`~/code/mogodb` - it is base for project setup and is imported to eclipse.

- added new softwares are /usr/local/mogodb, apache-maven.
- spark and front end framework, FreeMarker, is added as jar to project.

- Non relational JSON db
- Does not save in table, instead stored as JSON document.
- It does not support joins and sql.
- It does not support transactions.
- It supports indexes and secondary indexes.

- MongoD is the process which runs the mongoDB.
- Shell is js shell which connects via TCP to mongoD.


### Java Driver and Web Framework

- SparkJava and FreeMarker are framework which well use to interact with mongoDB.

- SparkJava is micro web fw to setup routes.
- FreeMarker is used for HTML views.

- runs under JVM
- all this talks to mongoDB via mongoDB java driver.

- @todo: Quick Introduction to the Mongo Shell - watch at home.

- mongod is server daemon and mongo is shell that connects to it .
- data is saved in /data/db by default

## Select & Where `find()`


### Using findOne function

- It takes first argument as document in which we have key and value.
- this acts as key = column, value = value like we give in where clause.

- the second argument to findOne is the document having keys as columns we want to see and value as true to see and false to skip.

- to use gr and lt we use a sub document in argument.

- eg. db.score.find ( { score : { $gt : 35 } } )

- db.score.find ( { score : { $gt : 35 , $lte : 60} , type : "English" } )

- where score > 35 and score <= 60 and type = "English";


### Introduction to find()

- the result is returned in form of batches. say 20.
- to page through type it.
- cursor on server is open. it is closed in say 10 mins on the server.
- .pretty() makes result more readable.


### Querying using field selection

- the 1st arg is like where clause. filter the result on matching conditions.
- it accepts doc and that is matched for results.

- @Note: We can give key without quotes but the value has to be in quotes when writing a document.

- the 2nd arg takes what we want to see in results. by default the _id column is selected. it is analogous to select clause in rdbms.

- e.g.
- > db.scores.find({student:19,type:"essay"} , {score:true,_id:false})


### Querying using $gt and $lt

- e.g.
- > db.scores.find({ score: { $gt : 95  }  })
- > db.scores.find({ score: { $gt : 95 , $lte: 96 }  })
- > db.scores.find({ score: { $gt : 95 , $lte: 96 } , type:"essay"  })


### Inequalities on String

- We can use lt, gt, lte, gte but this gives result based on UTF sorting of alphabets.
- eg. { name : { $lte : "D" } } # it may produce absurd results as well.

- We have $type in which we match the datatype of a field. It accepts a number based on BSON type.
- e.g: name : { $type : 2 } - this gives names having string value

- We have $regex which accepts regular expressions.

- We have $exists, it accepts a key name. It returns only that document which has this key in it.
- e.g: db.emp.find ( { profession : { $exists : true } } )
- Nested content is not matched, only top level array element is matched.

- $all is is like a sub set of elements. all should be there but in any order

- $in is like any of it should match.

- We can use gt and lt in string Comparisons.

```js
    > db.people.find()
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "rahul" }
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5aadaf90e8c76d19ccc"), "name" : "Ankit" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
    { "_id" : ObjectId("57bfa5bcdaf90e8c76d19cce"), "name" : "Anuj" }
    { "_id" : ObjectId("57bfa5c0daf90e8c76d19ccf"), "name" : "Arjun" }
    > db.people.find({name:{$lt:"D"}})
    { "_id" : ObjectId("57bfa5aadaf90e8c76d19ccc"), "name" : "Ankit" }
    { "_id" : ObjectId("57bfa5bcdaf90e8c76d19cce"), "name" : "Anuj" }
    { "_id" : ObjectId("57bfa5c0daf90e8c76d19ccf"), "name" : "Arjun" }
    > db.people.find({name:{$gt:"D",$lt:"M"}})
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
```

- In mongodb the name field can have numeric value as well. But with above query we will get only the result we got. name:42 for eg will not be retrieved.
- hence mongodb Comparison operator donot cross the data type boundary.


### Using $regex, $exists and $type

- exists is used to find if a certain filed is present in the document.
- type is used to find doc having value of particular type say string or number. the type code can be found from bson.org.
- regex is used to match regular expressions.


```js
    > db.people.find({age:{$exists:false}})
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "rahul" }
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5aadaf90e8c76d19ccc"), "name" : "Ankit" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
    { "_id" : ObjectId("57bfa5bcdaf90e8c76d19cce"), "name" : "Anuj" }
    { "_id" : ObjectId("57bfa5c0daf90e8c76d19ccf"), "name" : "Arjun" }
    { "_id" : ObjectId("57bfa78fdaf90e8c76d19cd0"), "name" : 42 }
    > db.people.find({age:{$exists:true}})
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    > db.people.find({name:{$type:2}}) //2 is code for string
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "rahul" }
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5aadaf90e8c76d19ccc"), "name" : "Ankit" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
    { "_id" : ObjectId("57bfa5bcdaf90e8c76d19cce"), "name" : "Anuj" }
    { "_id" : ObjectId("57bfa5c0daf90e8c76d19ccf"), "name" : "Arjun" }
    > db.people.find({name:{ $regex: "a"  }}) // all that have a somewhere
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "rahul" }
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
    > db.people.find({name:{ $regex: "e$"  }}) //ends with e
    > db.people.find({name:{ $regex: "a$"  }}) //ends with a
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }

    > db.people.find({name:{ $regex: "^A"  }}) //begins with A
    { "_id" : ObjectId("57bfa5aadaf90e8c76d19ccc"), "name" : "Ankit" }
    { "_id" : ObjectId("57bfa5bcdaf90e8c76d19cce"), "name" : "Anuj" }
    { "_id" : ObjectId("57bfa5c0daf90e8c76d19ccf"), "name" : "Arjun" }
```


### Using $or

- $or takes in an array of documents and combines them with or conditions.

- when the value is array in document and we specify it to match in find, then only the outer array is looked in.
- no recursion occurs or inner depth arrays are matched.

- MongoDB has no sql language. Instead it has functions that have arguments passes to them.


```js
    > db.people.find({ $or : [ {name:{$regex:"e"}} , { age : { $exists:true } } ] });
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa5a3daf90e8c76d19ccb"), "name" : "Jaspreet" }
    { "_id" : ObjectId("57bfa5b1daf90e8c76d19ccd"), "name" : "Hardeep" }
```


### Using $and

- Same as we use $or.

```js
    > db.people.find({ $and : [ {name:{$regex:"a"}} , { name : { $gt:"K" } } ] });
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "rahul" }
    { "_id" : ObjectId("57bfa594daf90e8c76d19cc9"), "name" : "Kashish" }
    { "_id" : ObjectId("57bfa59bdaf90e8c76d19cca"), "name" : "Patnam" }

    > db.people.find( {name:{$regex:"a"}, name : { $gt:"K" } } );
```

- This query also gives same result as the above one. And this more efficient as well.


### Querying inside Arrays

- MongoDB has polymorphic find. It also evaluates for matching array elements.

```js
    > db.accounts.find().pretty();
    { "_id" : ObjectId("57bff4973df8f8d7306e7918") }
    {
           "_id" : ObjectId("57bff4d93df8f8d7306e7919"),
           "name" : "vaibhav",
           "favorites" : [
                   "ice cream",
                   "beer"
           ]
    }
    {
           "_id" : ObjectId("57bff5043df8f8d7306e791a"),
           "name" : "Neeraj",
           "favorites" : [
                   "beer",
                   "Spring Roll"
           ]
    }

    > db.accounts.find({favorites:"beer"});
    { "_id" : ObjectId("57bff4d93df8f8d7306e7919"), "name" : "vaibhav", "favorites"
    : [ "ice cream", "beer" ] }
    { "_id" : ObjectId("57bff5043df8f8d7306e791a"), "name" : "Neeraj", "favorites" :
    [ "beer", "Spring Roll" ] }
    >
```

- Here nested contents are not matched. Only first level is looked into.


### Using $in and $all

- The $all operator matches all the elements that are specified with elements present inside the array.

```js
    db.accounts.find({favorites : {$all : [ "beer", "cheeze" ]} })
```

- The $in operator is used to filter results by having value in the values specified in $in array.

```js
    > db.accounts.find({name: {$in: ["Sahiba","Neeraj"]}});
    { "_id" : ObjectId("57bff5043df8f8d7306e791a"), "name" : "Neeraj", "favorites" :
    [ "beer", "Spring Roll" ] }
    { "_id" : ObjectId("57c017fc3df8f8d7306e791b"), "name" : "Sahiba", "favorites" :
    [ "beer", "Momo", "cheeze" ] }
    >
```


### Queries with dot notation

- to match nested documents, if we specify document in nested way then it is mactched exactly.
- we cannot match one key value. Not even in reversed order.

```js
    {
        "_id" : ObjectId("57c06919daf90e8c76d19cd2"),
        "name" : "Rahul",
        "email" : {
            "work" : "rahul@info.com",
            "personal" : "rgw@live.in"
        }
    }
```

- to find with email we have to pass exact email doc in find clause.
- Even the order of work and personal needs to be same.

- To query one part of doc,

```js
    > db.users.find({"email.work":"rahul@info.com"});
    { "_id" : ObjectId("57c06919daf90e8c76d19cd2"), "name" : "Rahul", "email" : { "work" : "rahul@info.com", "personal" : "rgw@live.in" } }
    >
```

- if we use . notation then we can match on value.
- e.g. email : `{ work: "abc", personal: "xyz"}`

- then email.work : "abc" - this fetches and gives result, while
- email : { work: "abc" } - this will not match as personal is also there in doc and byte by byte match will fail.

- Suppose a simple e-commerce product catalog called catalog with documents that look like this:

```js
    { product : "Super Duper-o-phonic",
     price : 100000000000,
     reviews : [ { user : "fred", comment : "Great!" , rating : 5 },
                 { user : "tom" , comment : "I agree with Fred, somewhat!" , rating : 4 } ],
     ... }
```

- Write a query that finds all products that cost more than 10,000 and that have a rating of 5 or better.

- Ans:

```js
    db.catalog.find(
       {
           "price" : {"$gt" : 10000},
           "reviews.rating" : {"$gte" : 5}
       }
    );
```


## Querying, Cursors

- cur = db.sb.find();
- cur.next(); - returns next doc
- cur.hasNext(); - true if there is next doc
- cur.sort({name:-1}) - sorts by descending name order
- cur.limit(5) - limits result set to 5, database only returns 5 docs.
- cur.sort({name:-1}).limit(5) - can be combined this way.
- cur.sort({name:-1}).limit(5).skip(2) - this sorts, skips 2 and shows 3 results. this sequence is followed by db engine,
- the sort, skip and limit is sent to db and performed on server, not on cursor in the memory.

- limit and sort are processed on server side and not in memory on client side.


> Q. When can you change the behavior of a cursor, by applying a sort, skip, or limit to it?
> A. This can be done at any point before the first document is called and before you''ve checked to see if it is empty.


### Counting Results

```js
    db.abc.count();
    db.abc.count({age : 34}); - arguments accepted are same as find();
```


## Updates

- its accepts two arguments, one is analogous to where clause like we pass in find command.
- The second argument is what we want to replace in the found doc. All the key:value in second arg replaces all the existing key:value in document except the _id field.
- It basically replaces wholosole document but it is dangerous.
- it replaces completely.

```js
    > db.people.update({name:"Rahul"},{name:"Rahul",age:32});
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```


### Set, Unset, Inc

- We can use update with $set to change only a particular key:value.
- e.g. db.people.update({name:Vaibhav},{$set : {  key:value, age:30 }})

- if the field does not exist then it will be added.

- db.people.update({ name:"Vaibhav"}, { $inc : { "age" : 1 }}); - this increases age by 1, if it age does not exist then it is crated as age:1.

- e.g.
    > db.people.update({name:"vaibhav"},{$set : { "name":"Vaibhav" } });
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })


### $unset Command

- it is used to remove a particular key value from a document.

```js db.people.update({key:value},{$unset,{key:1}});
    the second key value is removed from document.
```


```js
    > db.people.update({name:"Rahul"},{$unset:{age:1}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    > db.people.find();
    { "_id" : ObjectId("57befca2daf90e8c76d1910e"), "name" : "Vaibhav", "age" : 30 }
    { "_id" : ObjectId("57befdbddaf90e8c76d1910f"), "name" : "neeraj", "age" : 31 }
    { "_id" : ObjectId("57bfa58cdaf90e8c76d19cc8"), "name" : "Rahul" }

    > db.people.update({name:"Rahul"},{$unset:{age:-1}})
    this also removes the age from the document.
```


### Using $push, $pop, $pull, $pullAll, $addToSet

- a:[1,2,3,4,5] - is and array key value
- .update({find},{$set:{"a.2":5}}) - updates third value in array to 5.
- $push:{a:10} - add 10 in array.
- $pop:{a:1} - removes right most element.
- $pop:{a:-1} - removes left most element.
- $pushAll:{a:[3,54,23,5]} - pushes 4 more element to the array. It duplicates element even if it exists.
- same way we have pull and pullAll operators.
- $addToSet - add element to array if it does not exist. It does not dupicate a value.


### Upserts

- Updates if record exists else inserts. So if matching values are found then it updates. else it inserts.
- e.g. db.people.update({name:"Rahul"}, {$set: {age:28}} , { upsert : true } );
- The last argument tells shell to insert if name:Rahul is not in the collection.
- If the matching condition is not enought to find a particular result then also mongodb will insert the new doc.

```js
    > db.people.update({age:{$gt:50}},{name:"Sunny"},{upsert:true})
    WriteResult({
        "nMatched" : 0,
        "nUpserted" : 1,
        "nModified" : 0,
        "_id" : ObjectId("57c169edc1fc9c52ee7d6103")
    })

    This insers a new document to the collection:
    { "_id" : ObjectId("57c169edc1fc9c52ee7d6103"), "name" : "Sunny" }
```

- it can be used when we need to mix data from someother collection and we are not sure if the doc exists or not.


### Multi-Update

- by default update command only update a single record even if first argument provides more than one result.
- to update multiple rows provide 3rd argument as { multi : true }
- e.g. db.people.update( {}, {$set : { title: "Dr" }} , { multi : true } ) # this matches every doc because of find {}.

- this happens because MongoDB provides single thread to write operation.
- if multiple operations are performed on single document then it is mutually shared and one process updates and waits for other to
- update and so on.

- In multi-update there is pause and yield mechanism that follow. The multi update updates say 4 doc and then  pause to allow other write operation to occur on the document. then again picks the doc and updates other 4 doc.
- it allows other readers and writers to operator.
- mongodb does not allow isolated transaction while these multi updates are occurring.


## Remove

- first argument is same as find, the document should be passed. Must pass a doc, else all doc will be removed.
- {name: {$gt : "M"}} - all after m are removed.

- e.g.
- > db.people.remove({name:"Anuj"});
- WriteResult({ "nRemoved" : 1 })

- blank removes all the records one by one.
- contrary to drop.
- db.coll.drop();
- which removes all doc at

- drop is faster and also removes other data associated with the collection.

- by remove the indexes are not removed, while drop removes the indexes as well.
- also in remove a write or read operation may see a collection with half removed records. this does not happen in case of drop.
- also in here one doc is not half removed. it is isolated and atomic to a particular read write operation.


## Java driver

- Add dependecy in pom.xml, it adds necessary jars
- create db connection client,
- db connection handle,
- provide db name.


### Java Driver: Representing Documents

- We can represent docs using BSON Document class.
- we can append to the object as many doc as we want.
- it accepts different data types as well.
- Document class has helper functions like getString(), getInteger() that convert the object to particular data tyoe and then return the value.


- $or takes in an array of documents and combines them with or conditions.

- when the value is array in document and we specify it to match in find, then only the outer array is looked in.
- no recursion occurs or inner depth arrays are matched.

- projection is used to include and exclude coloumns.

```js
    col.find(doc)
    .projection(doc)
    .sort(doc)
    .skip(20)
    .limit(10)
    .into(doc);
```

- each of above doc can be replaced by builders.


## Update and replace

- replaceOne, update is used to update the information.


### delete

- deleteOne()
- deleteMany()
- find takes filter as document to provide where clause functionality.


### Blog, internals

- DAO is Data Access Object
- it is java class to access data of various objects. like user, session, blog etc.


## session management

- get signup
- result is singup page
- post details
- valid then writes to users, sessions table table, store cookie, redirects to welcome page
- sessions table holds new session.

- the id value in cookie in browser is same what we store in session collection.

---

Week 2 ends

Week 3 begins: Schema Design

---


## Schema Design

- can keep in 3rd normal form.
- but in mongo keep in application read form.
- organise to suit application data access pattern.
- imp fatc
- pre joins/embed
- no join
- no constraints
- atomic operations but no transaction
- no declared schema, but has a similar struct in a collection,

### Transaction in MongoDB

- we have atomicity possible in MongoDB
- we can achieve Transaction by making the whole Transaction in one doc only, instead of in multiple docs using join.
- MongoDB will make sure that doc is locked and is seen only after an update.

### One to One

- eny one can embed in other,
- should avoid embedding if doc size grows more than 16mb
- or to avoid bulk sizing.


### One to many

- there should be two collections with link in id.
- in case of, "One to Few", the few ones should be embedded into the one.

### Many to Many

- have to embedd into each other as array of IDs,
- for some reasons can be embedded as well.


### Benefits of embedding

- High latency and high bandwidth of disk.
- so if disk spins once then we can quickly get data.
- but for one spin it takes time.

### Trees

- To represent trees, add ancestors, complete list with hierarchies.

---
week 3 ends, week 4

---


## Performace

Performace can be increased by storage engine. from 3.0 we have pluggable storage engines.


### Storage Engines: Introduction

Engine allows mongodb to talk to disks:

- Mongo has pluggabel storage engines form 3.0;
- it decides what ot keep in mem and wht in disk. Since disks are slow.
- it doesnt effect communication bw servers.

**MMAP:**

- Asks to read data form memory in a page. If not found then data is brought from disk.
- multile reader single writer lock
- collection le=vl locking is done.
- only one write in 1 collection
- multile writers can happen in diff coll
- in place update occurs but if size excceeds then collection is moved to a differnt place.
- so power of two sizes is used in whcih a collection is kept in mem with more size as required to grow doc.
- os makes decision for managing in mem and in disk, db does not deciede.
- the minimum record space in MongoDB 3.0 is 32 bytes.
- MMAPv1 automatically allocates power-of-two-sized documents when new documents are inserted
- MMAPv1 is built on top of the mmap system call that maps files into memory


**WiredTiger:**

- It is faster
- document lvl concurrency
- lock free, optimistic concurrency
- two writes cannot happen 2gthr.
- 100gb data file is brought in mem in pages.
- WT manages what can be in mem and wht can be in disk,
- in mem not compressed, in disk it is compressed.
- compresses data of doc and indexes.
- no inplace update.
- writes the data to new place. and  frees old one.
- marks old as unused and creates new.
- this allows doc lvl concurrency.
- overall faster.
`mongod -dbpath WT -storageEngine WiredTiger`

- new dir is required to change engine bcz it cannot read other eni=gine memory.
`mongod -dbpath new_dir -storageEngine WiredTiger`



### indexes

- when a collection is stored in a disk it is stored in random order.
- to find all like name = some. the scan all doc. can be million.
- this determines speed and performace.

- index is ordered set of thing,

- may be alphabetically sorted. it has pointer to physical location.

- it uses binaray search and it will take log(2) to provide the doc.

- index can be for combinarion. like naem, hair color.
- then index entry is combinarion of cols.

- it can be used for just.
- name
- name, hairColor,
- name, hairColor, DOB

- but not
- hairColor
- or DOB.

- if we change anything on doc. then bTree is updated. so writes will be slower.
- reads will be much faster.

- insert all data and then create index.

- index uses disc space too. so cant be crated for all keys,

- so 10 million reocrds can be indexed for faster reads and redice disc IO.


### Creating Indexes

- 10 million students with score of 4 exams.

- explain commands tells what db is doing when we query.

- db.students.explain.find({student_id:5});

- in winning plan:
  - doing a collection scan/
  - findOne is faster,

- db.students.createIndex({student_id:1}); - student id ascending.
- it takes a while to create an index.

- now the queries are nice and fast.

- now on explain the winning plan shows that
- it uses indexName student_id.

- db.students.explain(true).find({student_id:5});
- this executes and tells docs scanned as well.
- it gives execution stages.

- compound index:
  - db.students.explain.find({student_id:1, class_id:-1});
  - this sorts the index as stated.


### Discovering and deleting indexes

- db.students.getIndexes(); - lists indexes
- db.students.dropIndex({student_id:1}); - deletes index.


### multiKey Indexes

- these are created on arrays.
- if we have arrays liek tags.
- then index can be created for all elements in array.
- we cant combine two arrays index.
- arrays cna be combined with a single value column.


### Dot Notaton and multi key index

- to reach indide an array or embedded doc.

- to create index on array elemnt.

- db.students.createIndex({'scores.score':1});
- this takes a long time and created an index.
- it is multi key index.

- find scores.score $gt 99 with explain

- show s winningplan with index being used.

- find ppl with exam score above 99.

- db.students.find({'scores': {$elemMatch: {type:'exam', score:{$gt:99.9}}}});

- it matches for element with match at least one.

- but if we run it with explain the we see that in winnig plan:

- it finds score 99.8 to inf
- then finds docs with type exam, so it examined all document.

- so all docs were examined.

- we can make a mistake by using AND operator because it doesnot gurantee the correct result.
- explain output tell more.
- next stage in winning plan better explains.


### Index Creation Options, Unique

-
- no two docs can have same key if it is indexed.

- we can make a unique index.

- db.stuff.createIndex({thing:1}, {unique:true});

- this makes things column unique.
- and if the data has duplicate values then we cannot create the unique index. we get an error.

- we get duplicate key error if we inset dulplicate value.


### Sparse Indexes

- ti can be used when index key is missing in doc.
- so id we have c in few docs.
- then  unique index will be created on thise that have c value and rest will be left inseted of having null causing unique to break.

- so to create a unique index on phone numbers we can make sparse index.

- db.employees.createIndex({cell:1},{unique:true, sparse:true});
- this will make an index on and will neglect nulls.

- check using getIndexes.


### Background Index Creation

- foreground is fast
- blocks all readers and writes.
- so cannot do on prod server.

- in Background
- it is slower
- dont block r/w.

- to work on replica set working set, take one out and create index on one and then rotate around to create on all. without performace bounty.

- db.students.createIndex({'scores.score':1}, {background:true});
- this will not create a r/w lock in collection.


### Using Explain

- it does not bring data to clientt].
- it is used to see whats gonna happen.

- from 3.0 explain changed
- explain returns and explainable object.
- we can see find, updatem remove, aggregate but not
- insert.

- db.foo.explain().find()
- .update() - etc..

- we can see things like docs scanned ,  n returned
- indexes used etc.


### Explain verbosity

-
- query Planner is default.
- we have execution stats and
- allPlans Execution.

- these are level of output.

- var exp =  db.example.explain("executionStats");
- exp.find({a: 17, b:57});

- it gives winning plan, query planner.
- in executionstats we get
- nReturned,
- executionTimeMillis.
- in each stage we ger doc returned,

- index is bound to min and max.

- index showuld be created to be used.
- all query should use atleast one index.

- so the index which is never used is waste
- and query which is not using atleast one index should be optimized.


### Covered queries

- query which can be looked from index only without examining the documents is called covered query.

- so if we have i,j,k as keys and we have index on them as well.
- and if we find (  { i:25, j:87} )
- then it will use index adn also use the docs.
- docs are used because we need _id filed as well/
- which is not in index and is picked from the docs.
- so avoid fetching _id and get faster results.

- also, we need to project exactly what we need and what we don;t
- if we say _id:0
- then too the docs will be scanned.

- mongodb examines docs
- we should specify which column we need and also make _id:0 to not show ID.
- then mongodb looks lesser docs. it may only look indexes


### When is an index used, choosing an index

- cooses index.
- created query plans for selected.
- then the fastest plan is picked.
- winning is :
- returned all, or
- returned a threshhold sorted.


### Index Sizes

- we should pay attension on size of indexes
- index should fit into memory (ram) for better performace
- index size depends on storage engines
- In fact, the index size can be considerably smaller (at the cost of some CPU space) in WiredTiger with --wiredTigerIndexPrefixCompression enabled.
- size can be seen using stat command.
- e.g. db.students.stats();
- db.students.totalIndexSize();



### Number of Index Entries, Cardinality

- It depends on the type of values on which index is being created.
- regular index is 1:1
- sparse index, having nulls or other values may have values less than docs
- multikey index, is one that can be on array or orther collection. it has values more than index. significantly larger.
- so on update the entire tag collection need to be built again on the disk.

--following is not revised.

### Geospatial Index

- These index 2d and 3d location indexes.
- e.g.
- 'location':[x,y]
- ensureIndex({"location":'2d',type:1});
- find({location:{$near:[x,y]}});


### Geospatial Spherical Index
  
- this index is called 2dsphere index.
- it is used to represent the earth lat and longitudes.

- e.g.

```js
db.places.find({
    location:{
        $near: {
            $geometry: {
                type: "Point",
                coordiantes :[-125.256, 37.1521]
            },
            $maxDistance:2000
        }
    }
}).pretty();
```

### Text Index

- these are used to create index on text.
- if we normally pass a word in find then it will match that word completely in the document. if whole set of words match a value.
- but if we make a text index on that key. then we can find using the index find.

```js
db.coll.createIndex({"words":'text'});
db.coll.find({$text:{$search:'dog'}});
```

- it searches in logical or operator.
- that is it matches single words in the index.

- we can rank them as well using score

- e.g.

```js
db.coll.find({$text:{$search:"some text here"}}, {score:{$meta: 'textScore'}}).sort({score:{$meta:'textScore'}});
```

-- following is revised.

### Efficiency of indexes used

- Goal is to make r/w faster.
- selectivity - minimize records c=scanned.
- sorts - how sorts are handeled.
- Examinig and making indexes fast:

```js
db.students.find({student_id:{$gt:500000}, class_id:54}).sort({student_id:1}).hint({class_id:1}).explain("executionstats");
```

- so in the above case 20k docs were returned but 80k docs were examined.
- to inc the efficiency we can porvide hint() to mongodb.

- we can pass index name to it so that it can use the index.
- passing the hint() after find() reduced the nScanned and made result faster.

```js
db.grades.find({
    "score":{$gte:65}
}).sort({"score":1});
```

- we should try to eliminate as much part of collection as possible and then further fetch the docs.
- so index should also be created in a way that first it helps in eliminating the max part and then it should sort or filter other values.


### Logging slow queries

- to debug we can profile whats slow in our app.
- mongo logs slow queries abive 100 ms
- it comes on the mongoD log screen.


## Profiling

- writes to system profile.
  - 0 off.
  - 1 log slow queries.
  - 2 log all queries.
- logs to system.profile.

- 2 for debugging and see traffic.

- > mongod --profile 1 --slowms 2
- it will log slow queries taking more than 2 ms.

`db.system.profile.find({ns:/school.students}).sort({ts:1}).pretty();`

- this gives all quries logged sorted by timestamp.

`db.system.profile.find({millis:{$gt:1}}).sort({ts:1}).pretty();`

- this gives all queries taking more than a ms.

```js
db.getProfilingLevel()
db.setProfilingLevel(1,4) // level and ms.
```


### MongoStat command

- like ioStat command in unix.
- gives 1sec info about ins, upd etc.

- :~ mongostat
- this is run on cmd. this gives all stats.

    e.g.

```js
>mongostat
insert query update delete getmore command % dirty % used flushes vsize   res qr|qw ar|aw netIn netOut conn                      time
    *0    *0     *0     *0       0     1|0     0.0    0.0       0  2.5G 24.0M   0|0   0|0   79b    17k    1 2016-08-29T16:13:25+05:30
    *0    *0     *0     *0       0     1|0     0.0    0.0       0  2.5G 24.0M   0|0   0|0   79b    17k    1 2016-08-29T16:13:26+05:30
    *0    *0     *0     *0       0     1|0     0.0    0.0       0  2.5G 24.0M   0|0   0|0   79b    17k    1 2016-08-29T16:13:27+05:30
    *0    *0     *0     *0       0     1|0     0.0    0.0       0  2.5G 24.0M   0|0   0|0   79b    17k    1 2016-08-29T16:13:28+05:30
```

these are pretty obvi.

### mongotop

-
- it is same as unix top command.
- it gives a high level view of where mongo is spending its time.

- it tell db on which time is spent most. it tells read time and write time.


## Sharding

- Splitting large collection into multiple servers.
- when we cannot get performace from a single server then we can shard.
- mongos is mongo shard that connects to shards.
- mongod has replicas.
- app talks to router, mongos.
- mongos talks to mongod on each server.

- when u can;t get performace from one server.

- insert must include shard key. should be aware fo shard key for collection

- for update if there is no shard key then the request will be broadcasted.
- multi update is broadcasted.

- update, remove and find are broadcasted to all shard.

---

Week 5

---


## Aggregation pipeline

Same as we pass in unix thru pipe.

```js
    $project    - reshape   - 1:1
    $match      - filter    - n:1
    $group      - aggregate - n:1
    $sort       - sort      - 1:1
    $skip       - skips     - n:1
    $limit      - limits    - n:1
    $unwind     - denormalize 1:n
    $out        - output    - 1:1
```

we will using all these.


### Simple agg example exlained

```js
    db.products.aggregate([
        {$group:
            {
                _id : "$manufacturer",
                nProd: { $sum : 1 }

            }
        }

    ]);
```

This will group by manufacturer and find number of products.


### Compound Grouping

group by more than a key.

```js

    db.products.aggregate([
        {$group:
            {
                _id : {
                    "manufacturer" : "$manufacturer",
                    "category" : "$category" } ,
                nProd: { $sum : 1 }

            }
        }

    ]);
```

> Note: the _id in mongoDB can be a document as well.


### Aggregation expressions overview

- $sum - sum or count
- $avg
- $min
- $max
- $push - builds arrays.
- $addToSet - does not duplicates.
- $first - sort the doc and then find first from group
- $last - same but last.

### sum

```js
    db.products.aggregate([
        {$group:
            {
                _id : { "maker" : "$manufacturer" },
                Sum_Prices : { $sum : "$price" }

            }
        }

    ]);
```

### avg

```js
    db.zips.aggregate([
        { $group : 
            {
                "_id" : "$state",
                "avg_pop" : { "$avg" : "$pop" }
            }
        }
    ]);
```

this groups by state and finds avg of population.


### addToSet

```js

    db.zips.aggregate([{
        $group:{
            "_id":"$city",
            "postal_codes":{"$addToSet":"$_id"}
        }
    }]);
```

- ids are postalcodes, what it does is, it adds all postalcodes to new
- key postal_codes and groups by city.


### max

```js

    db.zips.aggregate([{
        $group:{
            "_id":"$state",
            "max_pop":{"$max":"$pop"}
        }
    }]);
```

- this groups by state and finds maximum population.



### Group stages

Pass result through pipe line.

```js
    db.fun.aggregate([
        {$group:{
                _id:{a:"$a", b:"$b"},
                c:{$max:"$c"}
            }
            },
                {$group:{
                    _id:"$_id.a",
                    c:{$min:"$c"}
            }
        }
    ])
```



### Projections

- we can:
  - remove key
  - add new keys
  - reshape keys
  - use func:
    - $toUpper
    - $toLower
    - $add
    - $multiply

-we can show results as we want to by some operations on the values of keys.

```js

    db.products.aggregate([
        {$project:
            {
                _id:0,
                'maker':{ $toLower: "$manufacturer" },
                'details' : {
                                'category' : "$category" ,
                                'price' : { "$multiply" : ["$price",10] }
                            },
                'item' : '$name'
            }
        }
    ]);

    // below in wrong query:
    db.zips.aggregate([{
        $project:{
            _id:0,
            city:{$toLower:$city}, //wrong! $city has to be in "" . for _id as well
            pop:1,
            state:1,
            zip:$_id
        }
    }]);

    // correct:

    db.zips.aggregate([{
        $project:{
            _id:0,
            city:{$toLower:"$city"},
            pop:1,
            state:1,
            zip:"$_id"
        }
    }]);
```

### Match

filter, if matches doc is pushed to pipeline.
pre aggregate the filter.

e.g. filter state CA, and then do the stuff.

```js

    db.zips.aggregate([
        {$match:{
            state:"CA"
            }
        },
        { $group : { 
            _id:"$city",
            population:{$sum:"$pop"},
            zip_codes: { $addToSet : "$_id"}
            }
        },
        { $project : {
                _id:0,
                city: "$_id" ,
                population:1,
                zip_codes:1,
            }
        }
    ]);
```

> Note: One thing to note about $match (and $sort) is that they can use indexes, but only if done at the beginning of the aggregation pipeline.


### Sort, Skip, Limit

- it is disk and memory based.
- it can be done before and after grouping.

```js

    db.zips.aggregate([
        {$match:{
                state:"NY"
            }
        },
        { $group : { 
                _id:"$city",
                population:{$sum:"$pop"}
            }
        },
        { $project : {
                _id:0,
                city: "$_id" ,
                population:1
            }
        },
        { $sort: {
                population: -1
            }
        },
        { $skip: 4 },
        { $limit: 5}

    ]);
```


### First and Last

```js

    db.zips.aggregate([
        { $group : { 
                _id:{state:"$state", city:"$city"},
                population:{$sum:"$pop"}
            }
        },
        { $sort: {
                "_id.state":1,
                "population":-1
            }
        },
        /## group by state, get first city */
        { $group:{
                _id: "$_id.state",
                city : { $first : "$_id.city" },
                population : {$first:"population"}
            }
        },
        {$sort:{
                _id:1
            }
        };

```




### Limitations of the Aggregation Framework

100 mb limit for pipeline.
16 mb limit for python.

in sharded system when we group by then aggregation query goes to
each shard. then when we require all data, then all data goes to
primary shard. so same level of scalability is not found which can be
found in map reduce jobs in Hadoop.


---
Week 6 :

---

## APPLICATION ENGINEERING

durability, that data is on disk
fault taulerance, what happens on crash.
sharding, distribution across servers.


### Write Concern

DB writes pages to memory.
thse are written to disk, depending on mem pressure,

journal is log of every single thing happening on db.
writes to journal as well.
when journal is written then data is actually written on disk.


When a data is persistent. we have two values that govern this,
one is W and other is J.

w=1 denotes that data is written, it can be written to memnory or to
disk but no surity of it,

j means weather or not we wait for journal to be written to disk before we continue.

by default, j= false and w=1.
j=true is that data in journal is written to disk. this gives surity
that the data is persistent now.

the operation performed in MongoDB is on memory and not on disk. (fast)
journal is written periodically.

if server crashed we may loose data. (w came back but journal is not written)
disk is 100 to 1000 times slower.

by default w=1, j=false.
this means we;ll wait for write to be acknowledged but not journal
to be written
this is fast. lil vulnerable.

w=1.j=true can be done by driver at db or coll level.
slow. vulnerability is removed.

w=0 is not recommended. and the write is not acknowledged.

in replicated env we have other values of w that have significance.


### Network Errors

we might not get response from server about write when write happened but n/w error occured.

in case of insert we can try again with same _id and can at max
get duplicate key error.

in update problem occurs. so for $inc we cannot determine that
update occured or not.

to avoid update we can convert update to insert. delete and insert.


### Introduction to Replication

availability and fault toleracne. (in case of fire.)
all are mongod.
replicates asynchronously to sec.
sec elect, strict majority.
data written to p will be asynchronously will be written to s.
when p goes down then election occurs.
by majority the s becomes p.
then s becomes p and later when p comes up it comes as s.

by default we have 3 replications.


### Replica Set Elections

type of nodes:
regular -
arbiter (voting) - to vote in case of even nodes.
delayed/regular - disaster recovery, can be an hr behind, can;t become primary node. priority 0
hidden - can;t be primary. used for analytics. p=0.


### Write Consistency

write will goto p
reads can goto s as well. but may be stale data.
lag is not determined as sync is asynchronous.


### Creating a Replica Set

in real we keep on diff phy servers.
in our case we make on one server with diff dir and diff ports.
3 mondod instances are started.

replSet rs1 : this tells that they belong to one replica set.

mkdir -p /data/rs1 /data/rs2 /data/rs3
mongod --replSet m101 --logpath "1.log" --dbpath /data/rs1 --port 27017 --oplogSize 64 --fork --smallfiles
mongod --replSet m101 --logpath "2.log" --dbpath /data/rs2 --port 27018 --oplogSize 64 --smallfiles --fork
mongod --replSet m101 --logpath "3.log" --dbpath /data/rs3 --port 27019 --oplogSize 64 --smallfiles --fork

To run a mongod process as a daemon (i.e. fork), and write its output to a log file, use the --fork and --logpath options.

we also need to tie them together so that they can work in sync,

we need to config and tell that all are associated with each other.

config = { _id: "m101", members:[
{_id : 0, host : "localhost:27017"},
{ _id : 1, host : "localhost:27018"},
{_id : 2, host : "localhost:27019"} ]
};

rs.initiate(config);
rs.status();

After starting mongod s and then tying them together we start a
client using:
mongo --port 27018
we don;t get a normal port.
rs1.SECONDARY> rs.status();

we get above. and the result is:
all nodes status. a big doc.
sec, pri, sec. all nodes info comes.

we cannot write on secondary.

we then move to primary and insert a doc.
then goto sec and find the same collection.
we can't query sec'.
we set
>rs.slaveOk();
then we can read form s.


### Replica Set Internals

the replica sets have oplog. this is a log of change.
the primary writes all to oplog.
the secondary reads the oplog from primary and makes changes to primary.

to see oplog on primary
> use local
> show collections
oplog.rs is one we need.
it has detail of insert just performed.

now do:
$ ps -ef | grep mongod
the find process id of mongod primary/
$ kill 60494
this will bring down the primary.

then secondary becomes primary.
rs.status() shows the down server as not reachable.


- Failover and Rollback
- When p fails and secondary takes its place.
- now s may be behind and does not have some writes.
- the p gets back as s in some time.
- then p syncs with secondary to take new writes and realises that it has extra writes.
- it then rollsback those writes and saves to a file.
- this is failover and Rollback.

- Connecting to a Replica Set from the Java Driver


- When Bad Things Happen to Good Nodes

### Write Concern Revisited

- concerns which arise when we write to hard disk.
- w and j are the properties that govern how write will work.
- setting w=1 will wait for primary node to respond to acknowledgement of write.
- w=2 will wait for primary as well as secondary.
- w=3 will wait for 3 to respond.
- j=1 will wait for primary to write the journal to the disk.
- how long we wait is, is called wtimeout. it can be set in drivers.
- these 3, w,j and wtimeout define write concern.
- these can be set in connection, collection driver or when defining replica set.
- w:majority is used to wait until majority acknowledges the write.


### Read Preferences

- we usually read and write to the primary but we can set it to read from the secondary as well.
- it can be set to:
- primary - read only from primary
- primary preferred - if not available then read from secondary
- secondary - only rotate among secondaries
- secondary preferred - if not available then primary
- Nearest - sends to nearest one.
- tags - sends to tagged node.
- we can configure program to connect to secondary.
- then we can fail primary by
- rs.stepDown()
- then also the read continues with on secondary without faliure.


```py
import pymongo
import time

read_pref = pymongo.read_preferences.ReadPreference.SECONDARY

c = pymongo.MongoClient(host=["mongodb://localhost:27017",
"mongodb://localhost:27018",
"mongodb://localhost:27019"],
read_preference=read_pref)

db = c.m101
things = db.things

for i in range(1000):
doc = things.find_one({'_id':i})
print "Found doc ", doc
time.sleep(.1)


during execution if we stepDown primary. the read continues.
```

## Sharding and Replication

### Review of Implications of Replication

- seed lists - this is info and responsibility of driver to elect primary, keep all nodes data and keep track of them all.
- write concern - concern that w,j and wtimeout determine.
- read Preferences - how we set the reads.
- errors can happen - event after replications, errors can happen and will continue to happen because of n/w failure, h/w failure etc. for this knowledge of data and where it goes in application is necessary.

One thing to remember is that the driver will check, upon attempting to write, whether or not its write concern is valid. It will error if, for example, w=4 but there are 3 data-bearing replica set members. This will happen quickly in both the Java and pymongo drivers. Reading with an invalid readPreference will take longer, but will also result in an error. Be aware, though, that this behavior can vary a little between drivers and between versions.


### Introduction to Sharding

- horizontal scalabiling.
- Shard are dbs distributed.
- each shards can have replicas. these are different hosts.
- so shard s1 can have 3 replicas. R0. so s1-s5 will have 15 hosts. (5*3).
- router is calles mongos.
- it does sometimes range based sharding.
- so on Querying mongos knows where that particaular order_id will fall.
- it conncects quesries to diff hosts.
- we use range based distribution.
- done on the basis of shard key, may be order_id.
- mongos for certain order no. will send to particaular chuck.
- these chunks lives on particular shards.
- all replicas in shards are mondgod.
- If shard key is not in knowledge of mongos then the request is sent to all shards.
- As of MongoDB 2.4, we also offer hash-based sharding, which offers a more even distribution of data as a function of shard key, at the expense of worse - performance for range-based queries.
- Sharding is at db level.
- MongoS are stateless and can easily be replicated.


### Building a sharded environment

- this more of a DBA task.
- we can setup 3 shards having 3 replicas in each.
- we ll  have a mongos server connected to app. it listens to port number 27017 which is default.
- the other relicas use non standard ports as these are all on same pc (hosts) and act as different hosts.
- then we have config server (3). these have information about the shards.
- so data is broken into chunks.
- sharding can be done on
- range based - it uses a range on say some id
- hash based - is uses hash algorithm to shard the data.

- below is the script to start a sharded system on local computer.
- our mongo will connect to mongos and not mongo d.
- the sh.status() gives data of sharded system.


### Implications of sharding

every doc shud hav shard key and it is immutable (it can;t be changed).
index is req for shard key
index should start with shard key if multiKey.
in update, either shard key should be there or mulli update should be true.
for update shard key has to be specified. else it is sent to all nodes.

no unique index can be set unless it is part of shard key.
reason for no unique is that it doesn;t know about other shards.
we should choose shard key as one that we are going to use in most of our query as a key,



### Sharding and replication

they both are usually done togther.
mongos connects to pimary of replica mainly
for failover within shard, mongos reconnects.
write concers are still there.
j true or w majority are still there.
they apply to each node.
availability and concerns still apply.


### Choosing a shard key

it shud have sufficient cardinality (variety of values.)
so that it can be put in all shards
hotspoting (all requests going to one single place) shud be avoided.
so inserts should be such that the inserts goto different shards
e.g so username can be used as shard key. it gives nice parallelism.

hotspoting in writes should be avoided. anything that is monotonously increasing should be avoided
in shards there are $minKey and $maxKey and values within it goes into the shard.
when any value is greater than highest value of $maxKey then it always goes to the highest chunk,
so all inserts will goto one shard only.
sharding on (vendor,order_date) is pretty well as we get lot of cardinallity.


## Snippets

```bash

### clean everything up

echo "killing mongod and mongos"
killall mongod
killall mongos
echo "removing data files"
rm -rf /data/config
rm -rf /data/shard*


### start a replica set and tell it that it will be shard0

echo "starting servers for shard 0"
mkdir -p /data/shard0/rs0 /data/shard0/rs1 /data/shard0/rs2
mongod --replSet s0 --logpath "s0-r0.log" --dbpath /data/shard0/rs0 --port 37017 --fork --shardsvr --smallfiles
mongod --replSet s0 --logpath "s0-r1.log" --dbpath /data/shard0/rs1 --port 37018 --fork --shardsvr --smallfiles
mongod --replSet s0 --logpath "s0-r2.log" --dbpath /data/shard0/rs2 --port 37019 --fork --shardsvr --smallfiles

sleep 5

### connect to one server and initiate the set

echo "Configuring s0 replica set"
mongo --port 37017 << 'EOF'
config = { _id: "s0", members:[
{_id : 0, host : "localhost:37017" },
{ _id : 1, host : "localhost:37018" },
{_id : 2, host : "localhost:37019" }]};
rs.initiate(config)
EOF

### start a replicate set and tell it that it will be a shard1

echo "starting servers for shard 1"
mkdir -p /data/shard1/rs0 /data/shard1/rs1 /data/shard1/rs2
mongod --replSet s1 --logpath "s1-r0.log" --dbpath /data/shard1/rs0 --port 47017 --fork --shardsvr --smallfiles
mongod --replSet s1 --logpath "s1-r1.log" --dbpath /data/shard1/rs1 --port 47018 --fork --shardsvr --smallfiles
mongod --replSet s1 --logpath "s1-r2.log" --dbpath /data/shard1/rs2 --port 47019 --fork --shardsvr --smallfiles

sleep 5

echo "Configuring s1 replica set"
mongo --port 47017 << 'EOF'
config = { _id: "s1", members:[
{_id : 0, host : "localhost:47017" },
{ _id : 1, host : "localhost:47018" },
{_id : 2, host : "localhost:47019" }]};
rs.initiate(config)
EOF

### start a replicate set and tell it that it will be a shard2

echo "starting servers for shard 2"
mkdir -p /data/shard2/rs0 /data/shard2/rs1 /data/shard2/rs2
mongod --replSet s2 --logpath "s2-r0.log" --dbpath /data/shard2/rs0 --port 57017 --fork --shardsvr --smallfiles
mongod --replSet s2 --logpath "s2-r1.log" --dbpath /data/shard2/rs1 --port 57018 --fork --shardsvr --smallfiles
mongod --replSet s2 --logpath "s2-r2.log" --dbpath /data/shard2/rs2 --port 57019 --fork --shardsvr --smallfiles

sleep 5

echo "Configuring s2 replica set"
mongo --port 57017 << 'EOF'
config = { _id: "s2", members:[
{_id : 0, host : "localhost:57017" },
{ _id : 1, host : "localhost:57018" },
{_id : 2, host : "localhost:57019" }]};
rs.initiate(config)
EOF


### now start 3 config servers

echo "Starting config servers"
mkdir -p /data/config/config-a /data/config/config-b /data/config/config-c
mongod --logpath "cfg-a.log" --dbpath /data/config/config-a --port 57040 --fork --configsvr --smallfiles
mongod --logpath "cfg-b.log" --dbpath /data/config/config-b --port 57041 --fork --configsvr --smallfiles
mongod --logpath "cfg-c.log" --dbpath /data/config/config-c --port 57042 --fork --configsvr --smallfiles


### now start the mongos on a standard port

mongos --logpath "mongos-1.log" --configdb localhost:57040,localhost:57041,localhost:57042 --fork
echo "Waiting 60 seconds for the replica sets to fully come online"
sleep 60
echo "Connnecting to mongos and enabling sharding"

### add shards and enable sharding on the test db

mongo <<'EOF'
db.adminCommand( { addshard : "s0/"+"localhost:37017" } );
db.adminCommand( { addshard : "s1/"+"localhost:47017" } );
db.adminCommand( { addshard : "s2/"+"localhost:57017" } );
db.adminCommand({enableSharding: "school"})
db.adminCommand({shardCollection: "school.students", key: {student_id:1}});
EOF

```

