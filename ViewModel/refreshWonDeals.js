
const MongoClient = require('mongodb').MongoClient;
const crud = require('../Model/Database/crud')
const pipedrive = require('../Model/externalAPIs/pipedrive')
const bling = require('../Model/externalAPIs/bling')
const date = new Date

require('dotenv').config()

const refreshWonDeals = function (request, response) {
    const client = new MongoClient(process.env.database_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async function (err) {
        if (err){            
            response.send({
                "Status": "Error",
                "ErrorDescription": err
            })
            return
        }

        const db = client.db("mongoDataBase")
        await pipedrive.filterDealsByStatus('won')
            .then(async function (resp) {
                let deals = resp.data.data.items
                let count = 1
                const logDatabase = []
                deals.forEach(async function (element) {
                    const blingReturn = await bling.insertOrder(element.item.id + 'beta11', element.item.title, element.item.value)
                        .then(response => {
                            return response.data
                        })

                    if (blingReturn.retorno.pedidos) {
                        const order = blingReturn.retorno.pedidos[0]
                        logDatabase.push({
                            registerDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
                            dealId: element.item.id,
                            dealTitle: element.item.title,
                            dealValue: element.item.value,
                            orderID: order.pedido.idPedido
                        })
                    } else {
                        //Enable only if you desire to see if there are any deals with that problem
                        //console.log("Already registered in BLING system")
                    }

                    if(count == deals.length){
                        if (logDatabase.length != 0) {
                            crud.insertDocuments(db, res => { 
                                //console.log(res)
                                response.send({
                                    "Status": "Ok",
                                    "data": res
                                }) 
                                client.close();
                             }, logDatabase)
                             return
                        }else{
                            response.send({
                                "Status": "Error",
                                "ErrorDescription": "All deals are already registered in BLING system"
                            })  
                        }
                        client.close();
                    }                    
                    count++
                })
            })
            .catch(e => {
                console.log(`Error with Pipedrive: ${e}`)
            })        
    });
}


module.exports = {
    refreshWonDeals
}