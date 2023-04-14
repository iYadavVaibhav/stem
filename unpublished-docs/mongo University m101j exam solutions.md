# M101 - Mongo University

## Exam Solutions

```json

db.profile.find({
    "ns" : "school2.students.indexes",
}).sort({"millis":-1});


db.posts.aggregate([
    {
        "$unwind" : "$comments"
    },
    {
        "$group" : {
            "$_id" : "$comments.author",
            count : { $sum : 1 }
        }
    },
    {
        "$project" : {
            _id:0,
            "author" : "$_id",
            "Count" : "$count"
        }
    },
    {
        "$sort" : {
            "$count" : -1
        }
    }


]).pretty();

db.posts.aggregate([
    {
        "$unwind" : "$comments"
    },
    {
        "$project" : {
            "commentAuthor" : "$comments.author"
        }
    }
]).pretty();

db.posts.aggregate([
    {
        "$unwind" : "$comments"
    },
    {
        "$project" : {
            "commentAuthor" : "$comments.author"
        }
    },
    {
        "$group" : {
            "_id" : "$commentAuthor",
            "Total" : { "$sum" : 1 }
        }
    },
    {
        "$sort" : {"Total" : 1 }
    }
]).pretty();



db.zips.aggregate([

    {
        "$match" : {
            "state" : {"$in" : ['CT' , 'NJ'] },
            "pop"   : {"$gt" : 25000}
        }
    },

    {
        "$project" : {
            _id : 0,
            pop : 1,
            "state" : 1
        }
    },
    {
        $group : {
            _id : null,
            average : {"$avg" : "$pop" }
        }
    }

]).pretty();

// above is incorrect.

db.zips.aggregate([ 
    
    {
        $match: {
                state: {$in: ['CA', 'NY']}
            }
    }, 
    
    {$group: { 
            _id: {state: "$state", city: "$city"}, 
            pop: {$sum: "$pop"} 
        } 
    }, 

    {$match: {
            pop: {$gt: 25000}
        } 
    }, 

    {$group: { 
            _id: null, 
            pop: {$avg: "$pop"} 
        } 
    } 

]);

db.grades.aggregate([
    {
        $unwind : "$scores"
    },
    {
        $match : { "scores.type" : { $in : ["homework", "exam"] } }
    },

    {
        $group : {
            _id : { student_id : "$student_id", class_id : "$class_id" },
            avg : {$avg:"$scores.score"}
        }
    },

    {
        $group : {
            _id : "$_id.class_id",
            class_avg : {$avg : "$avg" }
        }
    },

    {$sort : {
            class_avg : 1
        }
    }

]).pretty();



db.zips.aggregate([
    {$project: {
            first_char: {$substr : ["$city",0,1]},
            pop:1
        }     
    },

    {
        $match : {
            first_char : { $regex : "^[0-9]{1,1}$" }
        }
    },

    {
        $group : {
            _id : null,
            total : {$sum : "$pop"}
        }
    }
])
```


## FINAL EXAM

`mongorestore -c messages -d enron <`

```json
db.corpus.find(
{
    "headers.From" : "andrew.fastow@enron.com",
    "headers.To" : {$in : ["jeff.skilling@enron.com"] }
}
).count();


db.corpus.aggregate([
    {
        $unwind : "$headers.To"
    },
    {
        $group : {
            _id : {from : "$headers.From", myId: _id},
            to : {$addToSet : "$headers.To"}
        }
    },
    {
        $unwind : "$to"
    },

    {
        $group : {
            _id : {
                from : "$_id.from",
                to : "$to"
            },
            total : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            total : -1
        }
    }

]).pretty();


db.corpus.aggregate([
    {
        $unwind : "$headers.To"
    },
    {
        $project : {
            _id : 1,
            from : "$headers.From",
            to: "$headers.To"
        }
    },
    {
        $group : {
            _id : {
                from : "$from",
                id : "$_id"
            },
            to : {$addToSet : "$to"}
        }
    },
    {
        $project : {
            from : "$_id.from",
            to : "$to",
            _id : "$_id.id"
        }
    },
    {
        $unwind : "$to"
    },
    {
        $group : {
            _id : {
                from : "$from",
                to : "$to"
            },
            total : {$sum : 1}
        }
    },
    {
        $sort : {
            total : -1
        }
    }
]).pretty();



db.messages.update(
    {
        "headers.Message-ID" : "<8147308.1075851042335.JavaMail.evans@thyme>"
    },
    {
        $addToSet : { "headers.To" : "mrpotatohead@10gen.com" }
    }
);
db.messages.findOne({"headers.Message-ID" : "<8147308.1075851042335.JavaMail.evans@thyme>"});


// Calvin Harris - Drinking From the Bottle (Feat. Tinie Tempah).mp3


db.posts.updateOne(
{
    "permalink" : "mxwnnnqaflufnqwlekfd"
},
{
    $inc : { "comments.1.num_likes" : 1 }
}
);


db.posts.findOne(
{
    "permalink" : "mxwnnnqaflufnqwlekfd"
}).pretty();

```

---
END
