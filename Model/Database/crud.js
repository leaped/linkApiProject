const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//InsertDocuments - As parameters
const insertDocuments = async function (db, callback, objetos) {
    // Get the documents collection
    const collection = db.collection('demo');
    // Insert some documents
    await collection.insertMany(objetos , function (err, result) {
        if (err)
            console.log(err)
        callback(result);
    });
}

//Find Documents - All
const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('demo');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        callback(docs);
    });
}



module.exports = {
    findDocuments,
    insertDocuments
}