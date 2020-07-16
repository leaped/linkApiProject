const axios = require('axios');
const qs = require('qs');

function insertOrder(dealID, dealName, dealValue){
    const data = qs.stringify({
        'apikey': '3748efb8740f45605f763ffb428bb99eafeccbcc252c4e34290e65be7724f97e28a5fa1d',
        'xml': `<?xml version="1.0" encoding="UTF-8"?>\n<pedido>\n <cliente>\n    <nome>${dealName}</nome>\n    <id>${dealID}</id>\n    </cliente>\n <itens>\n    <item>\n        <codigo>001</codigo>\n        <descricao>${dealName}</descricao>\n        <un>${dealValue}</un>\n        <qtde>1</qtde>\n        <vlr_unit>1.68</vlr_unit>\n    </item>\n </itens>\n</pedido>`
       });
       const config = {
         method: 'post',
         url: 'https://bling.com.br/Api/v2/pedido/json/',
         headers: { 
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         data : data
       };
       
       return axios(config)
}

module.exports = {
    insertOrder
}





// const teste = insertOrder(111111192, 'teste')
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
