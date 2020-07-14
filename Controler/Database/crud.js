const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

//InsertDocuments - Generic
const insertDocuments = async function (db, callback, objetos) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    await collection.insertMany(objetos , function (err, result) {
        if (err)
            console.log(err)
        callback(result);
    });
}

//Find Documents - Generic
const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({ 'a': 3 }).toArray(function (err, docs) {
        callback(docs);
    });
}



module.exports = {
    findDocuments,
    insertDocuments
}