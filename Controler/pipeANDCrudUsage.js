
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


    //Finding the documents that is already in our database (Working alone)
    crud.findDocuments(db, res => {
        const commitedDocuments = res.map(function (document) {
            return document.item.id
        });
        client.close();

        //Finding the register that isn't in our database (Working)
        pipedrive.filterDealsByStatus('won')
            .then(resp => {
                const filteredResult = resp.data.data.items.filter(function (value) {
                    if (commitedDocuments.indexOf(value.item.id) === -1)
                        return true
                    else
                        return false
                })

                //Inserting the documents that ins't in our database (WORKING ONLY ALONE[Need to FIX])
                crud.insertDocuments(db, res => {
                    console.log("==Novos documentos inseridos");
                    console.log(res)
                }, filteredResult)

            })
            .catch(e => {
                console.log(`Error with Pipedrive: ${e}`)
            })

        client.close();
    })
});