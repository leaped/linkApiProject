const MongoClient = require('mongodb').MongoClient;
const crud = require('./Database/crud')
require('dotenv').config()


const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async function (err) {
    //const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    if (err)
        console.log(err)
        
    const db = client.db("mongoDataBase");

    //Insert Documents
    await crud.insertDocuments(db, res => { 
        console.log("Insert the following records");
        console.log(res)
        client.close();
    }, [{ a: 4 }, { a: 8 }, { a: 12 }])

    //Find Documents
    // await crud.findDocuments(db, res => {
    //     console.log("Found the following records");
    //     console.log(res)    
    //     client.close();
    // })
});