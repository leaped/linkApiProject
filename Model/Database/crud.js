const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//InsertDocuments - As parameters
const insertDocuments = async function (callback, objetos) {
    const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(async function (err) {
        if (err) {
            response.send({
                "Status": "Database Error",
                "ErrorDescription": err
            })
            return
        }

        const db = client.db(process.env.database_NAME)
        const collection = db.collection(process.env.database_COLLECTION)
        await collection.insertMany(objetos, function (err, result) {
            if (err)
                console.log(err)
            callback(result);
            client.close()
        });
        
    })
}

//Find Documents - All
const findDocuments = function (callback) {
    const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(async function (err) {
        if (err) {
            response.send({
                "Status": "Database Error",
                "ErrorDescription": err
            })
            return
        }

        const db = client.db(process.env.database_NAME)
        const collection = db.collection(process.env.database_COLLECTION)
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
            client.close()
        });
        
    })
}

module.exports = {
    findDocuments,
    insertDocuments
}