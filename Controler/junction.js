
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
    const db = client.db("mongoDataBase")

    
        pipedrive.filterDealsByStatus('won')
            .then(async function (resp) {
                let deals = resp.data.data.items
                const logDatabase = []
                deals.forEach(async function (element) {
                    const blingReturn = await bling.insertOrder(element.item.id + 'beta1', element.item.title)
                        .then(response => {
                            return response.data
                        })

                    if(blingReturn.retorno.pedidos) {
                        const order = blingReturn.retorno.pedidos[0]
                        logDatabase.push({
                            registerDate: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
                            dealId: element.item.id,
                            dealTitle: element.item.title,
                            dealValue: element.item.value,
                            orderID: order.pedido.idPedido
                        })
                    }else{
                        console.log("Already registered in BLING system")
                    }

                    if (logDatabase.length == deals.length){
                        //crud.insertDocuments(db, res => { console.log(res) }, logDatabase)
                    }
                })                
            })
            .catch(e => {
                console.log(`Error with Pipedrive: ${e}`)
            })

        client.close();
});


module.exports.refreshWonDeals = function (req, res) {

}