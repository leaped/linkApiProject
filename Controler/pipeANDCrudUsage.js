
const MongoClient = require('mongodb').MongoClient;
const crud = require('./Database/crud')
const pipedrive = require('./externalAPIs/pipedrive')
require('dotenv').config()
module.exports.refreshWonDeals = function (req, res) {

}




const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async function (err) {
    if (err)
        console.log(err)

    const db = client.db("mongoDataBase");


    //Finding the documents that is already in our database (Working)
    crud.findDocuments(db, res => {
        const commitedDocuments = res.map(function (document) {
            return document.item.id
        });

        //Finding the register that isn't in our database (Working)
        pipedrive.filterDealsByStatus('won')
            .then(async function (resp) {
                const filteredResult = resp.data.data.items.filter(function (value) {
                    if (commitedDocuments.indexOf(value.item.id) === -1)
                        return true
                    else
                        return false
                })

                if (filteredResult.length > 0) {
                    //Inserting the documents that ins't in our database (Working)
                    crud.insertDocuments(db, res => { console.log(res) }, filteredResult)
                } else {
                    console.log("Todos documentos inseridos já")
                    /*  
                    const registerRepeated = resp.data.data.items.filter(function (value) {
                        if (commitedDocuments.indexOf(value.item.id) === -1)
                            return false
                        else
                            return true
                    })
                    */
                }
            })
            .catch(e => {
                console.log(`Error with Pipedrive: ${e}`)
            })

        //client.close();
    })
});