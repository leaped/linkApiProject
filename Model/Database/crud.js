const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//InsertDocuments - As parameters
const insertDocuments = async function (db, callback, objetos) {
    // Get the documents collection
    const collection = db.collection('demo');
    // Insert some documents
    await collection.insertMany(objetos, function (err, result) {
        if (err)
            console.log(err)
        callback(result);
    });
}

//Find Documents - All
const findDocuments = function (callback) {
    const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
    // Get the documents collection

    client.connect(async function (err) {
        if (err) {
            response.send({
                "Status": "Database Error",
                "ErrorDescription": err
            })
            return
        }

        const db = client.db("mongoDataBase")
        const collection = db.collection('demo');
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
        });
    })
}


module.exports = {
    findDocuments,
    insertDocuments
}