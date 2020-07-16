
const MongoClient = require('mongodb').MongoClient;
const crud = require('./Database/crud')
const pipedrive = require('./externalAPIs/pipedrive')
const bling = require('./externalAPIs/bling')
const date = new Date

require('dotenv').config()






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
                //Inserting the deals on BLING
                const deals = resp.data.data.items

                const logDatabase = []
                deals.forEach(async function (element) {
                    const blingReturn = await bling.insertOrder(element.item.id + 'teste14', element.item.title)
                        .then(response => {
                            return response.data
                        })

                    const order = blingReturn.retorno.pedidos[0]
                    logDatabase.push({
                        registerDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
                        dealId: element.item.id,
                        dealTitle: element.item.title,
                        dealValue: element.item.value,
                        orderID: order.pedido.idPedido
                    })
                    if(logDatabase.length == 19)
                        console.log(logDatabase[18])
                })

                return

                //=================================================================
                const filteredResult = deals.filter(function (value) {
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
                    const registerRepeated = deals.filter(function (value) {
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


module.exports.refreshWonDeals = function (req, res) {

}