const client = require("mongodb").MongoClient;

const MONGO_URL = process.env.MONGO_URL || "mongodb://app:mypassword345@ds231568.mlab.com:31568/be-like-ben"


let Db;

const connectToDatabase = (next) => {
    client.connect(MONGO_URL, (err, database) => {
        const db = database.db("be-like-ben")
        return next(err, db);
    })
}

const addUser = (user, next) => {
    connectToDatabase((err, db) => {
        const _users = db.collection("users");
        _users.insertOne(user, (err, result) => {
           return next(err, result)
        })
    });
}

const getUser = (email, next) => {
    connectToDatabase((err, db) => {
        const _users = db.collection("users");
        _users.findOne({email}, (err, result) => {
           return  next(err, result)
        })
    });
}


const getUserVirtuesCount = (user, next) => {
    connectToDatabase((err, db) => {
        const _virtues = db.collection("virtues");
        _virtues.aggregate([
            {
                $match: {
                  userId: user._id
                }
              },
              {
                $count: "benPoints"
              }
        ], (err, results) => {
            results.toArray().then((data) => {
                console.log("getting count of bens", {err, data})
                return  next(err, data)
            });
        })
    });
}




module.exports = {
    addUser,
    getUser,
    getUserVirtuesCount
}